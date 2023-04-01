import express from "express"
import { bookIssue, bookReturn,extendIssue, getAllIssues } from "../controller/bookIssueController.js";



import { isAuthenticatedUser } from "../middleware/auth.js";


const router=express.Router();

router.route("/CreateIssue").post(isAuthenticatedUser,bookIssue);
router.route("/Extend").put(extendIssue);
router.route("/AllIssue").get(getAllIssues);
router.route("/ReturnIssue").delete(bookReturn);

export default  router;
