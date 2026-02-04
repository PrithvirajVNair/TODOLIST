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
    description:{
        type:String,
        required:true,
        default:"Description..."
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

// model creation
const tasks = mongoose.model("tasks",taskSchema)
module.exports = tasks