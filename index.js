require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT ?? 8000
const databaseUrl=process.env.DATABASEURL
const jwt=require('jsonwebtoken')
const cors=require('cors')
const bcrypt=require('bcrypt')
const connectDB = require('./db')
const User = require('./Models/User')
const authenticate = require('./middleware/authenticate')
const error = require('./utils/error')
app.use(cors())
app.use(express.json())

app.get('/heathCheck', (req, res) => {
  res.send('Api health is good!!!')
})


app.post('/register',async(req,res,next)=>{
  const {username,email,password}=req.body

  if(!username || !email || !password){
    return res.status(400).json({message:"Invalid Data"})
  }
  try{
    let user=await User.findOne({email});
    if(user){
      return res.status(400).json({message:'User already exists'})
  }

  user=new User({
    username,
    email,
    password
  })
 
  const salt=await bcrypt.genSalt(10)
  user.password=await bcrypt.hash(password,salt)
 
  await user.save()
  return res.status(201).json({message:"User Created Successfully",user})
  }catch(error){
    next(error)
  }
  

})

app.post('/login',async(req,res)=>{
  const {email,password}=req.body
  try{
    const user=await User.findOne({email})
    if(!user){
      return res.status(400).json({message:'Invalid Credential'})
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({message:'Invalid Credential'})
    }

    delete user._doc.password
    const token=jwt.sign(user._doc,'secret-key')
    const payload={
      id:user._id,
      username:user.username,
      email:user.email
    }
    return res.status(200).json({
      message:'Login Successful',
      token,
      user:payload
     
    })

  }catch(error){
    next(error)
  }
})

app.get('/private',authenticate,async(req,res)=>{
  return res.status(200).json({message:'I am a private route'})
})

app.get('/public',(req,res)=>{
  return res.status(200).json({message:'I am a public route'})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.use((err,req,res,next)=>{
  console.log(err)
  const message=err.message? err.message:'Server Error Occurred';
  const status=err.status? err.status:500
  res.status(status).json({message})
})

connectDB(databaseUrl)
.then(()=>{
  console.log('Database is connected')
})
.catch((e)=>console.log(e))

