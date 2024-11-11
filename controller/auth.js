const bcrypt=require('bcrypt')
const User = require("../Models/User");
const { registerService } = require('../service/auth');

const registerController=async(req,res,next)=>{
    const {username,email,password}=req.body
    if(!username || !email || !password){
      return res.status(400).json({message:"Invalid Data"})
    }
    try{
      const user=await registerService({username,email,password})
        return res.status(201).json({message:"User Created Successfully",user})
    }catch(error){
      next(error)
    }
  }

  module.exports={registerController}