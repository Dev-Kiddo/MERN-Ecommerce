import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

import handleAsyncError from "../middlewares/handleAsyncError.js";
import HandleError from "../utils/handleError.js";

// Create new order
export const createNewOrder = handleAsyncError(async function (req, res, next) {
  const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  // const existingOrder = await orderModel.findOne({ "paymentInfo.id": req.body.orderData.paymentInfo.id });
  // console.log("existingOrder:", existingOrder);

  // if (existingOrder) {
  //   return;
  // }

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
export const getSingleOrder = handleAsyncError(async function (req, res, next) {
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

//Get All Order of the user
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

//Get All My Orders
export const getAllOrders = handleAsyncError(async function (req, res, next) {
  const orders = await orderModel.find({});

  let allOrdersTotal = 0;

  orders.forEach((order) => (allOrdersTotal += order.totalPrice));

  if (!orders) {
    return next(new HandleError("No orders found!", 404));
  }

  res.status(200).json({
    success: true,
    numOfOrders: orders.length,
    allOrdersTotal,
    orders,
  });
});

// Update Order Status
export const updateOrderStatus = handleAsyncError(async function (req, res, next) {
  const order = await orderModel.findById(req.params.id);
  // console.log(order);

  if (!order) {
    return next(new HandleError("No orders found!", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new HandleError("This order already been delivered", 404));
  }

  order.orderStatus = req.body.status;

  if (order.orderStatus === "Delivered") {
    await Promise.all(order.orderItems.map((item) => updateQuantity(item.product, item.quantity)));
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order,
  });
});

async function updateQuantity(id, quantity) {
  const product = await productModel.findById(id);

  if (!product) {
    return next(new HandleError("Product not found!", 404));
  }

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete Order Status
export const deleteOrder = handleAsyncError(async function (req, res, next) {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new HandleError("Order not found!", 404));
  }

  if (order.orderStatus !== "Delivered") {
    return next(new HandleError("Order is under processing, Can't  be deleted", 404));
  }

  await orderModel.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "order deleted successfully",
  });
});
