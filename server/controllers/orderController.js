import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

import handleAsyncError from "../middlewares/handleAsyncError.js";
import HandleError from "../utils/handleError.js";

// Create new order
export const createNewOrder = handleAsyncError(async function (req, res, next) {
  const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    user: req.user._id,
    paymentInfo,
    paidAt: Date.now(),
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Getting Single Order
export const getSignleOrder = handleAsyncError(async function (req, res, next) {
  const order = await orderModel.findById(req.params.id).populate("user", "name email");

  // console.log("order", order);

  if (!order) {
    return next(new HandleError("No orders found!", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get All My Orders
export const allMyOrders = handleAsyncError(async function (req, res, next) {
  const orders = await orderModel.find({ user: req.user._id });

  if (!orders) {
    return next(new HandleError("No orders found!", 404));
  }

  res.status(200).json({
    success: true,
    numOfOrders: orders.length,
    orders,
  });
});
