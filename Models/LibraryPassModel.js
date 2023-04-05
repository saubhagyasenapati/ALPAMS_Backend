import mongoose  from"mongoose";

const libraryPassSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
  },
  status:{
    type:String,
    default:"IN"
  },
  inTime: {
    type:Date,
    default:Date.now() + 6 * (60 * 60 * 1000) 
  },
  outTime:Date,
  scanCode:{
    type:String,
    required:true
  }
})

export const LibraryPass=mongoose.model("LibraryPass",libraryPassSchema);
