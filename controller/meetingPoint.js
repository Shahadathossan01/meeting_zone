const MeetingPoint = require("../Models/meeting_point");
const { meetingPointCreateService, meetingPointReadService, meetingPointDeleteService, meetingPointUpdateService } = require("../service/meetingPoint");
const error = require("../utils/error");

const meetingPointCreateController=async(req,res,next)=>{
    const {name,location,details,mapUrl,img1,img2,img3}=req.body;
    if(!name || !location || !details || !mapUrl || !img1 || !img2 || !img3){
        throw error('Invalid Data',400)
    }
    try{
        const meetingPoint=await meetingPointCreateService(name,location,details,mapUrl,img1,img2,img3)
      
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
    const {name,location,details,mapUrl,img1,img2,img3}=req.body
    try{
        const updatedMeetingPoint=await meetingPointUpdateService(id,name,location,details,mapUrl,img1,img2,img2)
        if(!updatedMeetingPoint){
            throw error('Data not found',400)
        }
        res.status(200).json({message:'Updated Successfully'})
    }catch(error){
        next(error)
    }
  }
const meetingPointByIdController=async(req,res,next)=>{
  const {id}=req.params;
  try{
    const meetingPoint=await MeetingPoint.findById(id)
    if(!meetingPoint){
      throw error('Not found meeting point',400)
    }
    res.status(200).json(meetingPoint)
  }catch(err){
    next(error)
  }
}

module.exports={meetingPointCreateController,meetingPointReadController,meetingPointDeleteController,meetingPointUpdateController,meetingPointByIdController}