require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT ?? 8000
const databaseUrl=process.env.DATABASEURL
const cors=require('cors')
const connectDB = require('./db')
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

connectDB(databaseUrl)
.then(()=>{
  console.log('Database is connected')
})
.catch((e)=>console.log(e))

