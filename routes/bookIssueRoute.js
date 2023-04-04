import express from "express"
import { bookIssue,bookReturn,bookDelete,extendIssue, getAllIssues, getAllUserIssues } from "../controller/bookIssueController.js";



import { isAuthenticatedUser } from "../middleware/auth.js";


const router=express.Router();

router.route("/CreateIssue").post(isAuthenticatedUser,bookIssue);
router.route("/Extend").put(extendIssue);
router.route("/AllIssue").get(getAllIssues);
router.route("/DeteteIssue").delete(bookDelete);
router.route("/ReturnIssue").put(bookReturn);
router.route("/Alluserissue").get(isAuthenticatedUser,getAllUserIssues);

export default  router;
