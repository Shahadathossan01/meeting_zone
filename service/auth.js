const bcrypt=require('bcrypt')
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
module.exports={registerService}