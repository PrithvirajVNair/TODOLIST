const jwt = require("jsonwebtoken")

const jwtMiddleware = async(req,res,next) => {
    const token = req.headers['authorization']?.split(" ")[1]
    try{
        if(token){
            const jwtResponse = await jwt.verify(token,process.env.JWT_KEY)
            req.payload = jwtResponse.userMail
            next()
        }
        else{
            return res.status(401).json("Please Login!")
        }
    }
    catch(err){
        res.status(401).json("Invalid Token")
    }
}

module.exports=jwtMiddleware