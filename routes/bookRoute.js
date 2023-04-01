import express from "express"
import { bookAdd, getAllBooks } from "../controller/bookController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router=express.Router();

router.route("/Add").post(bookAdd);
router.route("/All").get(getAllBooks);

export default  router;
