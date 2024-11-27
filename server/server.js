const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const messagesRoute = require('./routes/messagesRoute')
const socket = require('socket.io')
require('dotenv').config()

const app = express()

app.use(cors())//open cors.
app.use(express.json())
app.use("/api/auth",userRoutes)
app.use("/api/messages",messagesRoute)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{ 
    console.log("MongoDB coneected successfully")
}).catch((err)=>{
    console.log(err.message)
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT}`)
})

const io = socket(server,{
    cors:{
        origin: "https://chatapp-frontend-6knw.onrender.com",
        credentials: true,
    }
})
global.onlineUsers = new Map()
io.on("connection",(socket)=>{
    global.chatSocket=socket
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })
    socket.on("send-msg",(data)=>{
        console.log(data)
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    })
})
