const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User = require("../Models/User");
const { createNewUser, findUserByEmail } = require('./user');
const error = require('../utils/error');

const registerService=async({username,email,password})=>{
    const user=await findUserByEmail(email)

    if(user){
        throw error('User already exists',400)
    }

    const newUser=createNewUser(username,email,password)

    const salt=await bcrypt.genSalt(10)
    newUser.password=await bcrypt.hash(password,salt)

    await newUser.save()
    return newUser;
}

const loginService=async({email,password})=>{
    const user=await findUserByEmail(email)
      if(!user){
        throw error('Invalid Credential',400)
      }
  
      const isMatch=await bcrypt.compare(password,user.password)
      if(!isMatch){
        throw error('Invalid Credential',400)
      }
  
      delete user._doc.password
      const token=jwt.sign(user._doc,'secret-key')
      const payload={
        id:user._id,
        username:user.username,
        email:user.email
      }
      return {token,payload}
}
module.exports={registerService,loginService}