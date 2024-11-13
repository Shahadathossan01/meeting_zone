const BookingList = require("../Models/booking_list")
const { bookingListCreateService } = require("../service/bookingList")
const error = require("../utils/error")

const bookingListCreateController=async(req,res,next)=>{
    const userId=req.params.userId
    const {name,location,meetupType,date,shift,capacity,cost,overallCost}=req.body
    try{
        const bookingList=await bookingListCreateService(name,location,meetupType,date,shift,capacity,cost,overallCost,userId)
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
module.exports={bookingListCreateController,bookingListDeleteController}