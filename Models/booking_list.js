const mongoose=require('mongoose');
const {Schema,model}=mongoose;
const bookingListSchema=new Schema({
    username:String,
    meetupType:String,
    date:String,
    shift:String,
    members:Number,
    duration:Number,
    itemLocation:String,
    status:String,
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const BookingList=model('BookingList',bookingListSchema)
module.exports=BookingList;