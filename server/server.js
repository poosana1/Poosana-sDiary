const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const blogRoute = require('./routes/blog')
const authRoute = require('./routes/authentication')

const app = express()

//connect database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(()=>{
    console.log("connected")
}).catch((err)=>console.log("error"))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//route
//เส้นทางการส่ง request ไป server
app.use('/api',blogRoute)
app.use('/api',authRoute)

//ระบุ port
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`start server in port ${port}`)
})