const mongoose=require('mongoose')
const {Schema,model}=mongoose;

const meetingPointSchema=new Schema({
    name:String,
    location:String,
    details:String,
    mapUrl:String,
    img1:String,
    img2:String,
    img3:String
})

const MeetingPoint=model('MeetingPoint',meetingPointSchema)
module.exports=MeetingPoint;