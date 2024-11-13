require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT ?? 8000
const databaseUrl=process.env.DATABASEURL
const cors=require('cors')
const connectDB = require('./db')
const User = require('./Models/User')
const authenticate = require('./middleware/authenticate')
const { registerController, loginController } = require('./controller/auth')
const MeetingPoint = require('./Models/meeting_point')
const {meetingPointCreateController, meetingPointReadController, meetingPointDeleteController, meetingPointUpdateController } = require('./controller/meetingPoint')
const error = require('./utils/error')
const BookingList = require('./Models/booking_list')
const { bookingListCreateController, bookingListDeleteController, userBookingController } = require('./controller/bookingList')
app.use(cors())
app.use(express.json())

app.get('/heathCheck', (req, res) => {
  res.send('Api health is good!!!')
})


app.post('/register',registerController)
app.post('/login',loginController)

app.post('/meetingPoint',meetingPointCreateController)
app.get('/meetingPoint',meetingPointReadController)
app.delete('/meetingPoint/:id',meetingPointDeleteController)
app.patch('/meetingPoint/:id',meetingPointUpdateController)

app.post('/bookingList/:userId',bookingListCreateController)
app.delete('/bookingList/:id',bookingListDeleteController)

app.get('/userBooking/:userId',userBookingController)

app.get('/private',authenticate,async(req,res)=>{
  return res.status(200).json({message:'I am a private route'})
})
app.get('/public',(req,res)=>{
  return res.status(200).json({message:'I am a public route'})
})

app.use((err,req,res,next)=>{
  console.log(err)
  const message=err.message? err.message:'Server Error Occurred';
  const status=err.status? err.status:500
  res.status(status).json({message})
})

connectDB(databaseUrl)
.then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  console.log('Database is connected')
})
.catch((e)=>console.log(e))

