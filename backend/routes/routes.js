const express = require("express")

const userController = require('../controllers/userController')

const router = express.Router()


// =================================== Authentication Part ========================================

// Route for User Registration!
router.post("/user-register",userController.userRegisterController)

// Route for User Login!
router.post("/user-login",userController.userLoginController)

// =================================== Task Part ========================================

module.exports = router