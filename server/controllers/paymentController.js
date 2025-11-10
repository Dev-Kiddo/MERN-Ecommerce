import { instance } from "../server.js";
import handleAsyncError from "../middlewares/handleAsyncError.js";

export const processPayment = handleAsyncError(async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);
    // console.log("order:", order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("error", error);
  }
});

export const sendAPIkey = handleAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

export const paymentVerification = handleAsyncError(async (req, res, next) => {
  console.log(req.body);

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  console.log(razorpay_order_id);
  console.log(razorpay_payment_id);
  console.log(razorpay_signature);

  res.status(200).json({
    success: true,
    body: req.body,
  });
});
