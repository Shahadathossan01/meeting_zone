const MeetingPoint = require("../Models/meeting_point")

const meetingPointCreateService=async(name,location,details,mapUrl,img1,img2,img3)=>{
    const meetingPoint=new MeetingPoint({
        name,
        location,
        details,
        mapUrl,
        img1,
        img2,
        img3
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

const meetingPointUpdateService=async(id,name,location,details,mapUrl,img1,img2,img3)=>{
    const updatedMeetingPoint=await MeetingPoint.findByIdAndUpdate(id,{
        $set:{
          name:name,
          location:location,
          details:details,
          mapUrl:mapUrl,
          img1:img1,
          img2:img2,
          img3:img3
        }
      },{new:true})

      return updatedMeetingPoint
}


module.exports={meetingPointCreateService,meetingPointReadService,meetingPointDeleteService,meetingPointUpdateService}