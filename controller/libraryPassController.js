
// import { sendEmail } from "../util/sendmail.js";
import { sendToken } from "../util/sendToken.js";
import { ErrorHandler } from "../util/Errorhandler.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import { LibraryPass } from "../Models/LibraryPassModel.js";

//Create Library Pass
export const CreatePass=catchAsyncErrors(async(req,res,next)=>{
    const{scanCode}=req.body
    try {
      const libraryPass = await LibraryPass.find({user:req.user._id});
      const it = libraryPass[Symbol.iterator]()
      let LP={}
      for (let value of it) {
       if(value.status=="IN"){
        LP=value
        }
      }
     if(LP.status=="IN"){
      res.status(500).json({success:false,message:"Not Exited The Library In Previous Pass"})
     }  
    else{
      const Lpass=await LibraryPass.create(
        {
         user:req.user.id,
         inTime:Date.now()+6*60*60*1000-30*60*1000 ,
         scanCode:scanCode
        }
        
     );
     res.status(200).json({success:true,message:"Library Pass Created Sucessfully"})
    }
       
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
  
})

//Modify Pass
export const ModifyPass=catchAsyncErrors(async(req,res,next)=>{
    try {
      const Lpass=await LibraryPass.findById(req.body.id)
      
      if(!Lpass)
      {
        return next(new ErrorHandler("Pass not found",400));
      }
        Lpass.status="OUT";
        Lpass.outTime=Date.now()+6*60*60*1000-30*60*1000;
        await Lpass.save({validateBeforeSave:false});
        res.status(200).json({success:true,message:"Library Pass Out Successful"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

//Delete Pass
export const deleteAPass = catchAsyncErrors(async (req, res,next) => {
    const Lpass = await LibraryPass.findById(req.body.id);
    if (!Lpass) {
      return res.status(500).json({
        success: false,
        message: "Library Pass  not found",
      });
    }
    await Lpass.remove();

    res.status(200).json({
      success: true,
      message: "Library Pass Deleted successfully",
    });
    
  });

//All library Pass
export const getAllPass = catchAsyncErrors(async (req, res,next) => {
    const LibraryPasss = await LibraryPass.find();
    res.status(200).json({
      success: true,
      LibraryPasss ,
    });
  });

  //ALL User passes
  export const getAllUserPass = catchAsyncErrors(async (req, res,next) => {
    const libraryPass = await LibraryPass.find({user:req.user._id});
    res.status(200).json({
      success: true,
      libraryPass ,
    });
  });

  export const getUserPass = catchAsyncErrors(async (req, res,next) => {
    const libraryPass = await LibraryPass.find({user:req.user._id});
    const it = libraryPass[Symbol.iterator]()
    let LP={}
    for (let value of it) {
     if(value.status=="IN"){
      LP=value
      }
    }
      
    res.status(200).json({
      success: true,
      LP ,
    });
  });