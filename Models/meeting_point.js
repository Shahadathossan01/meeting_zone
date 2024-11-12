const mongoose=require('mongoose')
const {Schema,model}=mongoose;

const meetingPointSchema=new Schema({
    name:String,
    location:String,
    environtmentFootage:[String],
    details:String
})

const MeetingPoint=model('MeetingPoint',meetingPointSchema)
module.exports=MeetingPoint;