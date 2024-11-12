const MeetingPoint = require("../Models/meeting_point")

const meetingPointCreateService=async(name,location,environtmentFootage,details)=>{
    const meetingPoint=new MeetingPoint({
        name,
        location,
        environtmentFootage,
        details
      })
      await meetingPoint.save()
      return meetingPoint
}

const meetingPointReadService=async()=>{
    const meetingPoint=await MeetingPoint.find()
    return meetingPoint;
}

const meetingPointDeleteService=async(id)=>{
    const deleteMeetingPoint=await MeetingPoint.findByIdAndDelete(id)
    return deleteMeetingPoint
}
module.exports={meetingPointCreateService,meetingPointReadService,meetingPointDeleteService}