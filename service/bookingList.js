const BookingList = require("../Models/booking_list")

const bookingListCreateService=async(name,location,meetupType,date,shift,capacity,cost,overallCost,userId)=>{
    const bookingList=new BookingList({
        name,
        location,
        meetupType,
        date,
        shift,
        capacity,
        cost,
        overallCost,
        userId
      })
      await bookingList.save()
      return bookingList;
}

module.exports={bookingListCreateService}