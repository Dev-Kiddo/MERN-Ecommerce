import { instance } from "../server.js";
import handleAsyncError from "../middlewares/handleAsyncError.js";
import crypto from "crypto";

export const processPayment = handleAsyncError(async (req, res, next) => {
  console.log("Amount:", req.body);

  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);
    // console.log("order:", order);

    res.status(200).json({
      success: true,
      message: "Process payment success",
      order,
    });
  } catch (error) {
    console.log("errorProcessPayment ", error);
    res.status(400).json({
      success: false,
      message: "Process payment failed",
    });
  }
});

export const sendAPIkey = handleAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

export const paymentVerification = handleAsyncError(async (req, res, next) => {
  console.log("req.body =>", req.body);

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  // To verify payment, need to compare it like this with razorpay signature and exprectedSignature.this match confirms the payment is authentic

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  console.log("body:", body);

  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");

  const isAuthentic = razorpay_signature === expectedSignature;

  if (isAuthentic) {
    return res.status(200).json({
      success: true,
      message: "Payment Verified Successfully",
      reference: razorpay_payment_id,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});
