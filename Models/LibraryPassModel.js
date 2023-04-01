import mongoose  from"mongoose";

const libraryPassSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
  },
  inTime: {
    type:Date,
    default:Date.now
  },
  outTime:Date,
  scanCode:{
    type:String,
    required:true
  }
})

export const LibraryPass=mongoose.model("LibraryPass",libraryPassSchema);
