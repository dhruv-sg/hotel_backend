const jwt = require('jsonwebtoken')
require('dotenv').config();

const jwtAuthMiddleware = (req,res,next)=>{

    //first check request header has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error : "token not found"})

    //extract the jwt token from request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error : 'unauthorized'})

        try {
            
            //verify the jwt token 
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            //attach user information to he request object 
            req.user = decoded;
            next()
        } catch (error) {
            console.log(error);
            res.status(401).json({error : "invalid token"})
        }
}

//fucntion to generate token
const generatetoken = (userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET)
}

module.exports={jwtAuthMiddleware,generatetoken}