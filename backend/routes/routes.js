const express = require("express")

const userController = require('../controllers/userController')
const taskController = require('../controllers/taskController')
const jwtMiddleware = require("../middleware/jwtMiddleware")


const router = express.Router()


// =================================== Authentication Part ========================================

// Route for User Registration!
/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Task Management API
 *   description: Simple Todo/Task API with user authentication (JWT) and Google login support
 *   version: 1.0.0
 * servers:
 *   - url: http://localhost:3000/api   # ← change according to your base path
 *     description: Local development server
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserRegisterInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: JohnDoe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: Passw0rd!
 *     UserLoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     GoogleLoginInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - profile
 *         - password   # usually a dummy/random password
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         profile:
 *           type: string
 *           format: uri
 *         password:
 *           type: string
 *     TaskCreateInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           example: Finish project documentation
 *     TaskUpdateInput:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           example: 63f8b123456789abcdef1234
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Not Completed, In Progress, Completed]
 *           example: In Progress
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 63f8b123456789abcdef1234
 *         title:
 *           type: string
 *         description:
 *           type: string
 *           default: TASK
 *         status:
 *           type: string
 *           default: Not Completed
 *         userId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 * paths:
 *   /user-register:
 *     post:
 *       summary: Register a new user
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRegisterInput'
 *       responses:
 *         201:
 *           description: Account Created Successfully! Please Login!
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Account Created Successfully! Please Login!
 *         409:
 *           description: User already exists
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         500:
 *           description: Server / validation error
 *
 *   /user-login:
 *     post:
 *       summary: Login user with email & password
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginInput'
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       username: { type: string }
 *                       email: { type: string }
 *                       profile: { type: string }
 *                   token:
 *                     type: string
 *         401:
 *           description: Invalid credentials
 *         404:
 *           description: User not found
 *         500:
 *           description: Server error
 *
 *   /google-user-login:
 *     post:
 *       summary: Login or register via Google (frontend sends profile data)
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GoogleLoginInput'
 *       responses:
 *         200:
 *           description: Login/Register successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: object
 *                     properties:
 *                       username: { type: string }
 *                       email: { type: string }
 *                       profile: { type: string }
 *                   token:
 *                     type: string
 *         500:
 *           description: Server error
 *
 *   /create-task:
 *     post:
 *       summary: Create a new task (protected)
 *       tags:
 *         - Tasks
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskCreateInput'
 *       responses:
 *         201:
 *           description: Task created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Task Created Successful!
 *         401:
 *           description: Unauthorized – missing/invalid token
 *         404:
 *           description: User not found
 *         500:
 *           description: Server error
 *
 *   /get-task:
 *     get:
 *       summary: Get all tasks of the authenticated user (with optional search)
 *       tags:
 *         - Tasks
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: query
 *           name: search
 *           schema:
 *             type: string
 *           description: Search term (case-insensitive) in task title
 *           example: meeting
 *       responses:
 *         200:
 *           description: List of tasks
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Task'
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: User not found
 *         500:
 *           description: Server error
 *
 *   /task/{id}/details:
 *     get:
 *       summary: Get details of a single task
 *       tags:
 *         - Tasks
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Task MongoDB _id
 *       responses:
 *         200:
 *           description: Task details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Task'
 *         401:
 *           description: Unauthorized
 *         403:
 *           description: Forbidden (task does not belong to user)
 *         404:
 *           description: Task or user not found
 *         500:
 *           description: Server error
 *
 *   /update-task:
 *     put:
 *       summary: Update an existing task
 *       tags:
 *         - Tasks
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskUpdateInput'
 *       responses:
 *         200:
 *           description: Task updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Task Updated!!
 *         401:
 *           description: Unauthorized
 *         403:
 *           description: Forbidden – not owner
 *         404:
 *           description: User or task not found
 *         500:
 *           description: Server error
 *
 *   /delete-task/{id}:
 *     delete:
 *       summary: Delete a task
 *       tags:
 *         - Tasks
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Task MongoDB _id
 *       responses:
 *         200:
 *           description: Task deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Task Deleted!
 *         401:
 *           description: Unauthorized
 *         403:
 *           description: Forbidden – not owner
 *         404:
 *           description: User or task not found
 *         500:
 *           description: Server error
 */
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