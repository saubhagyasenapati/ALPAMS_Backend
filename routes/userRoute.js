import express from "express"
import { getAllUser, getUserDetails, login, register } from "../controller/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router=express.Router();

router.route("/register").post(register);
router.route("/login").get(login)
router.route("/userdetail").get(isAuthenticatedUser,getUserDetails)
router.route("/Alluserdetail").get(isAuthenticatedUser,getAllUser)
export default  router;
