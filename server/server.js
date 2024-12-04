const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const messagesRoute = require('./routes/messagesRoute')
const taskRoute = require('./routes/taskRoute')
const socket = require('socket.io')
require('dotenv').config()

const app = express()

app.use(cors())//open cors.
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/auth", userRoutes)
app.use("/api/messages", messagesRoute)
app.use("/api/task", taskRoute)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB coneected successfully")
}).catch((err) => {
    console.log(err.message)
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT}`)
})

const io = socket(server, {
    cors: {
        origin: "*", // Allows all origins
        methods: ["GET", "POST"], // Define allowed HTTP methods (optional, to be specific)
        credentials: true,
    }
})
global.onlineUsers = new Map()
io.on("connection", (socket) => {
    global.chatSocket = socket
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message)
        }
    })
})
