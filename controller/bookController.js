import {Book} from "../Models/bookModel.js"
// import { sendEmail } from "../util/sendmail.js";
import { sendToken } from "../util/sendToken.js";
import { ErrorHandler } from "../util/Errorhandler.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";

//ADD Book Details
export const bookAdd=catchAsyncErrors(async(req,res,next)=>{
    try {
        const {name,description,category,Stock,ISBN}=req.body;

       const book=await Book.create({
            name,description,category,Stock,ISBN
        });
        res.status(200).json({success:true,message:"Book Created Sucessfully"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

//Get All Books
export const getAllBooks = catchAsyncErrors(async (req, res,next) => {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      books,
    });
  });

 //Detete A Book 
  export const deleteABook = catchAsyncErrors(async (req, res,next) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(500).json({
        success: false,
        message: "Book not found",
      });
    }
    await book.remove();

    res.status(200).json({
      success: true,
      message: "Book Deleted successfully",
    });
    
  });

  //Modify Book Details
  export const updateBook = catchAsyncErrors(async (req, res, next) => {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(500).json({
        success: false,
        message: "Book not Found",
      });
    }
    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
        book,
      });
    });

 
