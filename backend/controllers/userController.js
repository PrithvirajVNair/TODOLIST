const users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


// User Registration Controller
exports.userRegisterController = async(req,res) => {
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User Already Exists...!")
        }
        else{
            // following is a third party library (bcrypt) to hash password and avoid plain text
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new users({
                username,email,password:hashedPassword
            })
            await newUser.save()
            res.status(201).json("Account Created Successfully! Please Login!")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

// User Login Controller
exports.userLoginController = async(req,res) => {
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(!existingUser){
            return res.status(404).json("User Not Found, Please Register!")
        }
        const match = await bcrypt.compare(password,existingUser.password)
        if(match){
            const token = await jwt.sign({userMail:existingUser.email},process.env.JWT_KEY)
            res.status(200).json(
                {
                    message:"Login Successful",
                    user:{
                            username:existingUser.username,
                            email:existingUser.email,
                            profile:existingUser.profile
                        },
                    token
                }
        )
        }
        else{
            res.status(401).json("Password does not Match!")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}