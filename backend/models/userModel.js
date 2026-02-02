const mongoose = require('mongoose')

// following is user schema for user details in MongoDB
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true,
        default:"https://t3.ftcdn.net/jpg/09/64/89/20/360_F_964892089_vioRltmAxaoQEBLtYtChVBxIzDWwhA3T.jpg"
    }
})

const users = mongoose.model("users",userSchema)
module.exports = users