const express = require("express")

const userController = require('../controllers/userController')
const taskController = require('../controllers/taskController')
const jwtMiddleware = require("../middleware/jwtMiddleware")
const router = express.Router()


// =================================== Authentication Part ========================================

// Route for User Registration!
router.post("/user-register",userController.userRegisterController)

// Route for User Login!
router.post("/user-login",userController.userLoginController)

// Route for User Login via Google!
router.post("/google-user-login",userController.googleLoginController)

// =================================== Task Part ========================================

// Route for task creation!
router.post("/create-task",jwtMiddleware,taskController.createTaskController)

// Route for get task!
router.get("/get-task",jwtMiddleware,taskController.getTasksController)

// Route for get a single task! (for task Details)
router.get("/task/:id/details",jwtMiddleware,taskController.getATasksController)

// Route for update task!
router.put("/update-task",jwtMiddleware,taskController.updateTaskController)

// Route for deleting task!
router.delete("/delete-task/:id",jwtMiddleware,taskController.deleteTaskController)

module.exports = router