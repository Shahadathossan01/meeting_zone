const bcrypt=require('bcrypt')
const User = require("../Models/User");

const registerService=async({username,email,password})=>{
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
    return user;
}
module.exports={registerService}