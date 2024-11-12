const MeetingPoint = require("../Models/meeting_point");
const { meetingPointCreateService, meetingPointReadService } = require("../service/meetingPoint");
const error = require("../utils/error");

const meetingPointCreateController=async(req,res,next)=>{
    const {name,location,environtmentFootage,details}=req.body;
    if(!name || !location || !environtmentFootage || !details){
        throw error('Invalid Data',400)
    }
    try{
        const meetingPoint=await meetingPointCreateService(name,location,environtmentFootage,details)
      
        res.status(200).json(meetingPoint)
    }catch(error){
        next(error)
    }
  }

const meetingPointReadController=async(req,res,next)=>{
    try{
        const meetingPoint=await meetingPointReadService()
        res.status(200).json(meetingPoint)
    }catch(error){
        next(error)
    }
  }

module.exports={meetingPointCreateController,meetingPointReadController}