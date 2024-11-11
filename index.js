require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT ?? 8000
const databaseUrl=process.env.DATABASEURL
const cors=require('cors')
const connectDB = require('./db')
const User = require('./Models/User')
const authenticate = require('./middleware/authenticate')
const { registerController, loginController } = require('./controller/auth')
app.use(cors())
app.use(express.json())

app.get('/heathCheck', (req, res) => {
  res.send('Api health is good!!!')
})


app.post('/register',registerController)

app.post('/login',loginController)

app.get('/private',authenticate,async(req,res)=>{
  return res.status(200).json({message:'I am a private route'})
})

app.get('/public',(req,res)=>{
  return res.status(200).json({message:'I am a public route'})
})


app.use((err,req,res,next)=>{
  console.log(err)
  const message=err.message? err.message:'Server Error Occurred';
  const status=err.status? err.status:500
  res.status(status).json({message})
})

connectDB(databaseUrl)
.then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  console.log('Database is connected')
})
.catch((e)=>console.log(e))

