const express=require('express');
// creating an mini application
const productsApp=express.Router();
// importig necessary modules
const asyncHandler=require('express-async-handler');

// importing an middleware
const verifyToken=require('../middleware/verifyToken');

// using body parser for every request
productsApp.use(express.json());

// creating an routes for request
productsApp.get('/get-products',verifyToken,asyncHandler(async(request,response)=>{
    const productsCollection=request.app.get('productsCollection');
    const products=await productsCollection.find().toArray();
    response.status(201).send({message:"products list",payload:products})
}))

// exporting mini application
module.exports=productsApp;