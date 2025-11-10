import express from "express";
import { paymentVerification, processPayment, sendAPIkey } from "../controllers/paymentController.js";
import { verifyUserAuth } from "../middlewares/userAuth.js";

const router = express.Router();

router.route("/payment/process/").post(verifyUserAuth, processPayment);
router.route("/getkey").get(verifyUserAuth, sendAPIkey);
router.route("/payment/verification").post(paymentVerification);

export default router;
