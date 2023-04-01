
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot be more than 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should have more than 8 characters"],
    select:false
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  // otp:{
  //   type:Number
  // },
  // otpExpire:{
  //   type:Date,
  // },
});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
       next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
});

//JWT TOKEN
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

//Compare Password
userSchema.methods.comparePassword=async function (enterdPass){
    return await bcrypt.compare(enterdPass,this.password)
}

//Generating Password Reset Token
userSchema.methods.getResetPassswordToken=function(){
  //Generating Token
  const resetToken=crypto.randomBytes(20).toString("hex");
  this.otp=crypto.createHash("sha256").update(resetToken).digest("hex");
  this.otpExpire=Date.now()+ 15*60*1000;
  return resetToken;
}


export const User=mongoose.model("User",userSchema);
