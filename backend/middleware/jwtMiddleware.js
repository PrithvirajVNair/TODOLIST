const jwt = require("jsonwebtoken")

// jwt middleware for user authentication!
const jwtMiddleware = async(req,res,next) => {
    // accessing token of authorized user
    const token = req.headers['authorization']?.split(" ")[1]
    try{
        if(token){
            // decoding token using verify (secure way) to get information provided in it
            const jwtResponse = await jwt.verify(token,process.env.JWT_KEY)
            // saving it inside req.payload for lated use of details in backend
            req.payload = jwtResponse.userMail
            // request send to backend
            next()
        }
        else{
            // happens when user is not logged in
            return res.status(401).json("Please Login!")
        }
    }
    catch(err){
        res.status(401).json("Invalid Token")
    }
}

module.exports=jwtMiddleware