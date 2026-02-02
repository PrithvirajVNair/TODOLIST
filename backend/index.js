require("dotenv").config()
const express = require('express')
const cors = require("cors")

// import database connection
require('./config/connection')

// importing router
const router = require('./routes/routes')

// server is created
const server = express()

server.use(cors())
server.use(express.json())
server.use(router)

PORT = 4000

server.listen(PORT,()=>{
    console.log("Server is Running");
})

server.get("/",(req,res)=>{
    res.status(200).send('<h1>Server is Running</h1>')
})