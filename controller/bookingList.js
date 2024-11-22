const BookingList = require("../Models/booking_list")
const { bookingListCreateService } = require("../service/bookingList")
const error = require("../utils/error")

const bookingListCreateController=async(req,res,next)=>{
    const {username,meetupType,date,shift,members,duration,itemLocation,status,userId}=req.body
    try{
        const bookingList=await bookingListCreateService(username,meetupType,date,shift,members,duration,itemLocation,status,userId)
        if(!bookingList){
            throw error('Not create new booking list',400)
        }
        res.status(200).json({message:'Create new booking list',bookingList})
    }catch(err){
        next(error)
    }
  }
const bookingListDeleteController=async(req,res,next)=>{
    try{
      const {id}=req.params
      const deleteBooking=await BookingList.findByIdAndDelete(id)
      if(!deleteBooking){
        throw error('Booking not found',400)
      }
      res.status(200).json({message:'Booking delete successfully'})
    }catch(err){
      next(error)
    }
  }
const userBookingController=async(req,res,next)=>{
    const {userId}=req.params
    try{
      const bookings=await BookingList.find({userId})
      res.status(200).json(bookings)
    }catch(err){
      next(error)
    }
  }

module.exports={bookingListCreateController,bookingListDeleteController,userBookingController}