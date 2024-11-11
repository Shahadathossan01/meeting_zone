const User = require("../Models/User")

const createNewUser=(username,email,password)=>{
    const user=new User({username,email,password})
    return user
}

const findUserByEmail=async(email)=>{
    const user=await User.findOne({email})
    return user
}

module.exports={createNewUser,findUserByEmail}