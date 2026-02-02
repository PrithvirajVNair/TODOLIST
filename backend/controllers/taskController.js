const tasks = require("../models/taskModel")
const users = require("../models/userModel")

// controller for creating a new task
exports.createTaskController = async (req, res) => {
    const { title } = req.body
    const email = req.payload
    try {
        const currentUser = await users.findOne({ email })
        if (!currentUser) {
            return res.status(404).json("User Not Found!")
        }
        const newTask = new tasks({
            title, userId: currentUser._id
        })
        await newTask.save()
        res.status(201).json("Task Created Successful!")
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// controller for reading/get existing task
exports.getTasksController = async (req, res) => {
    const email = req.payload
    try {
        const currentUser = await users.findOne({ email })
        if (!currentUser) {
            return res.status(404).json("User Not Found!")
        }
        const allTasks = await tasks.find({ userId: currentUser._id })
        res.status(200).json(allTasks)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// controller for updating existing task
exports.updateTaskController = async (req, res) => {
    const { id, title, status } = req.body
    const email = req.payload
    try {
        const currentUser = await users.findOne({ email })
        const updateTask = await tasks.findOne({ _id: id })
        if (!currentUser) {
            return res.status(404).json("User Not Found!")
        }
        if (!updateTask) {
            return res.status(404).json("Task Not Found!")
        }
        if (currentUser._id != updateTask.userId) {
            return res.status(403).json("You have No Permission!!")
        }
        updateTask.title = title
        updateTask.status = status
        await updateTask.save()
        res.status(200).json("Task Updated!!")
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// controller for deleting existing task
exports.deleteTaskController = async (req, res) => {
    const { id } = req.params
    const email = req.payload
    try {
        const currentUser = await users.findOne({ email })
        const deleteTask = await tasks.findOne({ _id: id })
        if (!currentUser) {
            return res.status(404).json("User Not Found!")
        }
        if (!deleteTask) {
            return res.status(404).json("Task Not Found!")
        }
        if (currentUser._id != deleteTask.userId) {
            return res.status(403).json("You have No Permission!!")
        }
        await tasks.findByIdAndDelete({ _id: id })
        res.status(200).json("Task Deleted!")
    }
    catch (err) {
        res.status(500).json(err)
    }
}