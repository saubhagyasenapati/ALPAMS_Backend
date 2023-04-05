
// import { sendEmail } from "../util/sendmail.js";
import { sendToken } from "../util/sendToken.js";
import { ErrorHandler } from "../util/Errorhandler.js";
import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import { BookIssue } from "../Models/bookIssueModel.js";
import { Book } from "../Models/bookModel.js";


//Issue Book
export const bookIssue=catchAsyncErrors(async(req,res,next)=>{
    try {
       
       const bookIssue=await BookIssue.create(
           {
            user:req.user.id,
            bookId:req.body.bookId,
            bookName:req.body.bookName,
            ISBN:req.body.ISBN
           }
        );

        const book= await Book.findById(req.body.bookId)
        if(book.Stock<1){
          return next(new ErrorHandler("Book Cannot be Issued",400))
        }
        book.Stock=book.Stock-1
        await book.save({validateBeforeSave:false})
        if(bookIssue){
          res.status(200).json({success:true,message:"Book Issue successfully"})
        }
        else{
          return next(new ErrorHandler("Book Cannot be Issued",400))
        }
       
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

//Modify Issue
export const extendIssue=catchAsyncErrors(async(req,res,next)=>{
    try {
      const bookIssue=await BookIssue.findById(req.body.id)
      
      if(!bookIssue)
      {
        return next(new ErrorHandler("Book Not Issued to this User",400));
      }
        bookIssue.returnDate=bookIssue.returnDate+7*24*60*60*1000;
        await bookIssue.save({validateBeforeSave:false});
        res.status(200).json({success:true,message:"Book Return day Extended"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})


  //Return Book
  export const bookReturn = catchAsyncErrors(async (req, res,next) => {
    const bookIssue = await BookIssue.findById(req.body.id);
    if (!bookIssue) {
      return res.status(500).json({
        success: false,
        message: "Book Issue Detail Not Available",
      });
    }
    const book= await Book.findById(bookIssue.bookId)
    book.Stock=book.Stock+1
    bookIssue.currentStatus="Returned"
    bookIssue.returnDate=Date.now()
    await book.save({validateBeforeSave:false})
    await bookIssue.save({validateBeforeSave:false})
    res.status(200).json({
      success: true,
      message: "Book Returned successfully",
    });
    
  });
  export const bookDelete = catchAsyncErrors(async (req, res,next) => {
    const bookIssue = await BookIssue.findById(req.body.id);
    if (!bookIssue) {
      return res.status(500).json({
        success: false,
        message: "Book Issue Detail Not Available",
      });
    }
    const book= await Book.findById(bookIssue.bookId)
    book.Stock=book.Stock+1
    await book.save({validateBeforeSave:false})
    await bookIssue.remove();
    res.status(200).json({
      success: true,
      message: "BookIssue Deleted successfully",
    });
    
  });
//Book Issue Per Specic User
export const getAllUserIssues = catchAsyncErrors(async (req, res,next) => {
  const BookIssues = await BookIssue.find({user:req.user._id});
  res.status(200).json({
    success: true,
    BookIssues,
  });
});
//All Book Allocation
export const getAllIssues = catchAsyncErrors(async (req, res,next) => {
    const BookIssues = await BookIssue.find();
    res.status(200).json({
      success: true,
      BookIssues,
    });
  });