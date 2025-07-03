// importing json web token to caompare the requested token is valid or not
const jwt=require('jsonwebtoken');

// importing secret key from env file
const secret_key=process.env.SECRET_KEY;
const verifyToken=(request,response,next)=>{
    const authHeaders=request.headers.authorization;
    if(!authHeaders){
        next(new Error("unauthorized access!"));
    }else{
        try{
        const bearerToken=authHeaders.split(' ')[1];
        jwt.verify(bearerToken,secret_key);
        next();
    }
    catch(errorObject){
        next(new Error("Session has been expired, please login again to access!",errorObject));
    }
    }
}

module.exports=verifyToken;