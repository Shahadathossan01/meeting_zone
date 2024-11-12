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
module.exports={meetingPointCreateService,meetingPointReadService}