// creating server
const express=require('express');
const cors=require('cors');
// loading .env file
require('dotenv').config();

// creating app
const app=express();

// assigning the port number
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server is listening on ${port} port number`);
})

// creating data base connnection
// importing the mongo db client

const mongoClient=require('mongodb').MongoClient;

// connecting to database
const mongoUrl=process.env.MONGO_DB_URL;
mongoClient.connect(mongoUrl)
.then(dbref=>{
    const db=dbref.db('usersdb');
    const usersCollection=db.collection("usersCollection");
    const productsCollection=db.collection("productsCollection");
    app.set('usersCollection',usersCollection);
    app.set('productsCollection',productsCollection);
    console.log("datbase connected succesfully");
})
.catch(error=>{
    console.log("error occured in database connection",error);
})

// allowing cors to access specific port
const origin=process.env.ORIGIN;
app.use(cors({
    origin:origin,
    credentials:true
}));

// importing Api's
const userApi=require('./Apis/userApi');
const productsApi=require('./Apis/productsApi');

// available apis
app.use('/user-api',userApi);
app.use('/products-api',productsApi);

// handling invalid path
// using middleware for handling invalid path errors
app.use('*',(request,response,next)=>{
    response.status(501).send({message:"invalid path request"});
});

// handling errors in api
// using middleware for checking the errors for every request
app.use((error,request,response,next)=>{
    response.status(500).send({message:"error occured in api",errorMessage:error.message});
});