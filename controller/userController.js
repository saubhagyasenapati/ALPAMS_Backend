import {User} from "../Models/userModel.js";
// import { sendEmail } from "../util/sendmail.js";
import { sendToken } from "../util/sendToken.js";
import { ErrorHandler } from "../util/Errorhandler.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
export  const register=catchAsyncErrors(async(req,res)=>{
    try {
        const {name,email,password,rollno}=req.body;
        let user=await User.findOne({email});
        if(user)
        {
            return res.status(400).json({error:"user already exists"})
        }
        // const otp=Math.floor(Math.random()*100000)
        // otp,otpexpiry:new Date(Date.now()+process.env.OTP_EXPIRY*60*1000)
        // const message=`Your Password OTP is :-\n\n${otp}\n\n if Not requested Kindly ignore it`;
        // try{
        //     await sendEmail({
        //         email:email,
        //         subject:"Ecommerce Password Recovery",
        //         message
        //     })
           
        //     res.status(200).json({
        //      success:true,
        //      message:`Email Send to ${user.email} successfully`
        //     })
        // }
        user=await User.create({
            name,email,password,rollno
        });
       
        sendToken(user,201,res,"User Created Successfully") 
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

export const login=catchAsyncErrors(async(req,res,next)=>{
    try {
        const {email,password}=req.body;

        if(!email||!password){
            return next(new ErrorHandler("Please Enter Email And Password ",400))
        }
    
        const user= await User.findOne({email}).select("+password");
    
        if(!user){
            return next(new ErrorHandler("Invalid email or password",401))
        }
    
        const isPasswordMatched=await user.comparePassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password",401))
        }
    
        sendToken(user,200,res,"User Login Success")
       
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

export const logout=catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:'Logged Out',
    });
})

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
});

export const updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is Incorrect",401))
    }

    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not Match",400))
    }

    user.password=req.body.newPassword ;

    await user.save();

    sendToken(user,200,res)
   
});

export const getAllUser=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users,
    });
});

export const deleteAUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.body.id);
    await user.remove();
    res.status(200).json({
      success: true,
      message: "User Deleted successfully",
    });
});