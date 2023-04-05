import express from "express"
import { deleteAUser, getAllUser, getUserDetails, login, register } from "../controller/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login)
router.route("/userdetail").get(isAuthenticatedUser,getUserDetails)
router.route("/Alluserdetail").get(isAuthenticatedUser,getAllUser)
router.route("/Deleteuser").delete(deleteAUser)
export default  router;
