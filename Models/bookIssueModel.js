
import mongoose from "mongoose";
const bookIssueSchema = new mongoose.Schema({
    bookId:{
        type:mongoose.Schema.ObjectId,
        ref:"Book",
        required:true,
    },
    bookName:{
        type:String,
        required:true
    },
    issueDate:{
        type:Date,
        default:Date.now
      },
    returnDate:{
        type:Date,
        default:Date.now()+ 7*60*60*1000*24
    },
    user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
  }
});


export const BookIssue=mongoose.model("bookIssueSchema",bookIssueSchema);