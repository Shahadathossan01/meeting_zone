const bcrypt=require('bcrypt')
const User = require("../Models/User");

const registerController=async(req,res,next)=>{
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
  }

  module.exports={registerController}