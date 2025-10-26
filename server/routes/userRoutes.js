import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  requestPasswordReset,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateProfile,
  getSingleUser,
  updateUserRole,
} from "../controllers/userController.js";
import { verifyUserAuth, roleBasedAccess } from "../middlewares/userAuth.js";
import { getUsersList } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(requestPasswordReset);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").post(verifyUserAuth, getUserDetails);
router.route("/password/update").post(verifyUserAuth, updateUserPassword);
router.route("/profile/update").post(verifyUserAuth, updateProfile);

// Admin - Get All users
router.route("/admin/users").get(verifyUserAuth, roleBasedAccess("admin"), getUsersList);

// Admin - Get user
router.route("/admin/user/:id").get(verifyUserAuth, roleBasedAccess("admin"), getSingleUser).put(verifyUserAuth, roleBasedAccess("admin"), updateUserRole);

export default router;
