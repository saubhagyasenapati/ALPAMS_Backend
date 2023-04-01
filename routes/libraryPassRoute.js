import express from "express"
import { CreatePass, deleteAPass, getAllPass, ModifyPass } from "../controller/libraryPassController.js";

import { isAuthenticatedUser } from "../middleware/auth.js";

const router=express.Router();

router.route("/CreatePass").post(isAuthenticatedUser,CreatePass);
router.route("/OutPass").put(ModifyPass);
router.route("/AllPass").get(getAllPass);
router.route("/DeletePass").delete(deleteAPass);

export default  router;
