import express from "express";
import { registerUser, loginUser, logoutUser, requestPasswordReset, resetPassword, getUserDetails, updateUserPassword, updateProfile } from "../controllers/userController.js";
import { verifyUserAuth } from "../middlewares/userAuth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(requestPasswordReset);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").post(verifyUserAuth, getUserDetails);
router.route("/password/update").post(verifyUserAuth, updateUserPassword);
router.route("/profile/update").post(verifyUserAuth, updateProfile);

export default router;
