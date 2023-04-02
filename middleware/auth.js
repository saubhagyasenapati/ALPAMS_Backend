// const ErrorHandler = require("../utils/errorhandler");
// const catchAsyncError = require("./catchAsyncError");
// const jwt=require("jsonwebtoken");
// const User = require("../Models/userModel");
import { ErrorHandler } from "../util/Errorhandler.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import  jwt from "jsonwebtoken";
import { User } from "../Models/userModel.js";
// export const isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{

//     const {token}=req.cookies;
    
//     if(!token){
//        return next(new ErrorHandler("Please Login to continue Shopping",401)) 
//     }

//     const decodedData=jwt.verify(token,process.env.JWT_SECRET)

//     req.user=await User.findById(decodedData.id);
//     console.log(req.user);
//     next();

// })

export const isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    //get the user from authtoken and add ID to req object
    const token=req.header('auth-token')
    if(!token){
        return next(new ErrorHandler("Please Login to continue ",401)) 
     }
    try {
        const data=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(data.user.id);
        next()  ;
    } catch (error) {
        return next(new ErrorHandler("Please Login to continue",401)) 
    }
    
})
