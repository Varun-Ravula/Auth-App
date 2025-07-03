// importing mini exress application
const express = require('express');
const userApp = express.Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importing multer module to upload photos
const multerObject=require('../middleware/cloudinaryConfig');

// body parser
userApp.use(express.json());

// imorting middleware
const verifyToken = require('../middleware/verifyToken');

// creating an api
// registering user
userApp.post('/register-user', multerObject.single('profile') ,asyncHandler(async (request, response) => {
    try {
        const usersCollection = request.app.get('usersCollection');
        // here accessig the request.body.user because we appended the details before in register component and converting them into general javascript object
        console.log(request.body);
        const registerUser = JSON.parse(request.body.user);
        
        const userExist = await usersCollection.findOne({ email: registerUser.email });
        if (userExist !== null) {
            response.status(200).send({ message: "user already existed, Register with different email" })
        } else {
            const hashedPassword = await bcrypt.hash(registerUser.password, 5);
            if (hashedPassword == false) {
                response.send({ message: "error occured in hashed password" });
            } else {
                // accessing the path provided by the cloudinary service
                registerUser.image=request.file.path;
                registerUser.password = hashedPassword;
                await usersCollection.insertOne(registerUser);
                response.status(201).send({ message: "user registered successfully" });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}));

// user login
const secret_key=process.env.SECRET_KEY;

userApp.post('/login-user', asyncHandler(async (request, response) => {
    const usersCollection = request.app.get("usersCollection");
    const userFromRequest = request.body;
    const userExistInDb = await usersCollection.findOne({ email: userFromRequest.email });
    if (userExistInDb == null) {
        response.status(200).send({ message: "invalid credentials please check your credentials / if not registered, register first please" });
    } else {
        const compareHashedResult = await bcrypt.compare(userFromRequest.password, userExistInDb.password);
        if (compareHashedResult === false) {
            response.status(200).send({ message: "invalid password please try again!" });
        } else {
            const jwtToken = jwt.sign({ email: userFromRequest.email }, secret_key, { expiresIn: 200 })
            delete userExistInDb.password;
            delete userExistInDb._id;
            response.status(200).send({ message: "success", token: jwtToken, payload: userExistInDb });
        }
    }
}))

// get users
userApp.get('/get-users', verifyToken, async (request, response) => {
    const usersCollection = request.app.get("usersCollection");
    const usersOfDb = await usersCollection.find().toArray();
    const purifiedUsers = usersOfDb.map(user => {
        const { password, _id, ...restProperties } = user;
        return restProperties;
    })
    response.status(200).send({ message: "users of db", payload: purifiedUsers });
})

// get-user by email
userApp.get('/get-user/:email', verifyToken, asyncHandler(async (request, response) => {
    const emailInParams = request.params.email;
    const usersCollection = request.app.get("usersCollection");
    const userInDb = await usersCollection.findOne({ email: emailInParams });
    delete userInDb.password;
    delete userInDb._id;
    if (userInDb == null) {
        response.send({ message: "user not found, please check your credentials" });
    }
    else {
        response.status(400).send({ message: "user found", payload: userInDb });
    }
}))
// exporting the mini application
module.exports = userApp;