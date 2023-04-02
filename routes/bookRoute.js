import express from "express"
import { bookAdd, deleteABook, getAllBooks, getBookDetails, updateBook } from "../controller/bookController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router=express.Router();

router.route("/Add").post(bookAdd);
router.route("/All").get(getAllBooks);
router.route("/BookDelete").delete(deleteABook);
router.route("/ModifyBook").post(updateBook);
router.route("/bookdetail").get(getBookDetails)

export default  router;
