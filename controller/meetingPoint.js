const MeetingPoint = require("../Models/meeting_point");
const { meetingPointCreateService, meetingPointReadService, meetingPointDeleteService, meetingPointUpdateService } = require("../service/meetingPoint");
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

const meetingPointDeleteController=async(req,res,next)=>{
    const {id}=req.params;
    try{
      const deleteMeetingPoint=await meetingPointDeleteService(id)
      if(!deleteMeetingPoint){
        throw error('This data not found',400)
      }
      res.status(200).json({message:'Delete Successfully'})
    }catch(error){
      next(error)
    }
  }

const meetingPointUpdateController=async(req,res,next)=>{
    const {id}=req.params;
    const {name,location,environtmentFootage,details}=req.body
    try{
        const updatedMeetingPoint=await meetingPointUpdateService(id,name,location,environtmentFootage,details)
        if(!updatedMeetingPoint){
            throw error('Data not found',400)
        }
        res.status(200).json({message:'Updated Successfully'})
    }catch(error){
        next(error)
    }
  }
module.exports={meetingPointCreateController,meetingPointReadController,meetingPointDeleteController,meetingPointUpdateController}