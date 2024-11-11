const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User = require("../Models/User");
const { registerService, loginService } = require('../service/auth');
const error = require('../utils/error');

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

const loginController=async(req,res,next)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw error('Invalid Data',400)
    }
    try{
      const {token,payload}=await loginService({email,password})
      return res.status(200).json({
        message:'Login Successful',
        token,
        user:payload
       
      })
  
    }catch(error){
      next(error)
    }
  }

  module.exports={registerController,loginController}