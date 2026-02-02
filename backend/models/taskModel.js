const mongoose = require('mongoose')

// following is task schema for task details in MongoDB
const taskSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Not Completed"
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const tasks = mongoose.model("tasks",taskSchema)
module.exports = users