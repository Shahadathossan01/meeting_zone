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
const {meetingPointCreateController, meetingPointReadController, meetingPointDeleteController, meetingPointUpdateController, meetingPointByIdController } = require('./controller/meetingPoint')
const error = require('./utils/error')
const BookingList = require('./Models/booking_list')
const { bookingListCreateController, bookingListDeleteController, userBookingController } = require('./controller/bookingList')
app.use(cors())
app.use(express.json())

const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'meetu674077e4148f5'
const store_passwd = 'meetu674077e4148f5@ssl'
const is_live = false //true for live, false for sandbox
const { v4: uuidv4 } = require('uuid');
const { bookingListCreateService } = require('./service/bookingList')

app.get('/heathCheck', (req, res) => {
  res.send('Api health is good!!!')
})


app.post('/register',registerController)
app.post('/login',loginController)

app.post('/meetingPoint',meetingPointCreateController)
app.get('/meetingPoint',meetingPointReadController)
app.delete('/meetingPoint/:id',meetingPointDeleteController)
app.patch('/meetingPoint/:id',meetingPointUpdateController)
app.get('/meetingPointById/:id',meetingPointByIdController)

app.post('/bookingList',bookingListCreateController)
app.delete('/bookingList/:id',bookingListDeleteController)

app.get('/userBooking/:userId',userBookingController)

app.post('/initiate-payment',async(req,res)=>{
  const {username,meetupType,date,shift,members,duration,itemLocation,status,userId}=req.body

  try{
    const bookingList=await bookingListCreateService(username,meetupType,date,shift,members,duration,itemLocation,status,userId)
    if(!bookingList){
        throw error('Not create new booking list',400)
    }
  }catch(err){
    next(error)
}

  const data = {
    total_amount: duration*1000,
    currency: 'BDT',
    tran_id: uuidv4(), // use unique tran_id for each api call
    success_url: 'http://localhost:3000/success',
    fail_url: 'http://localhost:3000/fail',
    cancel_url: 'http://localhost:3000/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: meetupType,
    product_profile: 'general',
    cus_name: username,
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: itemLocation,
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
};
const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
sslcz.init(data).then(apiResponse => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL
    res.status(200).json(GatewayPageURL)
    // res.redirect(GatewayPageURL)
    // console.log('Redirecting to: ', GatewayPageURL)
});
app.post('/success',async(req,res,next)=>{
  try{
    //TODO
    res.redirect('http://localhost:5173/success')
  }catch(err){
    next(error)
}
})

app.post('/fail',async(req,res)=>{
  //TODO
  res.redirect('http://localhost:5173/fail')
})

app.post('/cancel',async(req,res)=>{
  //TODO
  res.redirect('http://localhost:5173/cancel')
})

})




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

