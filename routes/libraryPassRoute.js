import express from "express"
import { CreatePass, deleteAPass, getAllPass, getAllUserPass, getUserPass, ModifyPass } from "../controller/libraryPassController.js";

import { isAuthenticatedUser } from "../middleware/auth.js";

const router=express.Router();

router.route("/CreatePass").post(isAuthenticatedUser,CreatePass);
router.route("/OutPass").put(ModifyPass);
router.route("/AllPass").get(getAllPass);
router.route("/AllUserPass").get(isAuthenticatedUser,getAllUserPass);
router.route("/UserPass").get(isAuthenticatedUser,getUserPass);
router.route("/DeletePass").delete(deleteAPass);

export default  router;
