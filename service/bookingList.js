const BookingList = require("../Models/booking_list")

const bookingListCreateService=async(username,meetupType,date,shift,members,duration,itemLocation,status,userId)=>{
    const bookingList=new BookingList({
        username,
        meetupType,
        date,
        shift,
        members,
        duration,
        itemLocation,
        status,
        userId
      })
      await bookingList.save()
      return bookingList;
}

module.exports={bookingListCreateService}