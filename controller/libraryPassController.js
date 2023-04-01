
// import { sendEmail } from "../util/sendmail.js";
import { sendToken } from "../util/sendToken.js";
import { ErrorHandler } from "../util/Errorhandler.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import { LibraryPass } from "../Models/LibraryPassModel.js";

//Create Library Pass
export const CreatePass=catchAsyncErrors(async(req,res,next)=>{
    const{scanCode}=req.body
    try {
       
       const Lpass=await LibraryPass.create(
           {
            user:req.user.id,
            inTime:Date.now(),
            scanCode:scanCode
           }
        );
        res.status(200).json({success:true,message:"Library Pass Created Sucessfully"})
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
        Lpass.outTime=Date.now();
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