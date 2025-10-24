import productModel from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middlewares/handleAsyncError.js";

//? Creating Products
export const addProduct = handleAsyncError(async function (req, res, next) {
  console.log(req.body);

  const product = await productModel.create(req.body);

  return res.status(201).json({
    success: true,
    message: "Product Added Successfully",
    product,
  });
});

//? Get Products
export const getAllProducts = handleAsyncError(async function (req, res, next) {
  const products = await productModel.find({});

  return res.status(200).json({
    success: true,
    message: "Get All Products Successfull",
    numofProducts: products.length,
    products,
  });
});

//? Update Products
export const updateProduct = handleAsyncError(async function (req, res, next) {
  const productId = req.params.id;

  // let product = await productModel.findById(productId);

  // if (!product) {
  //   return res.status(500).json({
  //     success: false,
  //     message: "Product Not Found",
  //   });
  // }

  const product = await productModel.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });

  console.log("product:", product);

  if (!product) {
    // return res.status(500).json({
    //   success: false,
    //   message: "Product Not Found",
    // });
    return next(new HandleError("Product Not Found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Update Product Successfull",
    product,
  });
});

//? Delete Products
export const deleteProduct = handleAsyncError(async function (req, res, next) {
  const productId = req.params.id;

  // let product = await productModel.findById(productId);
  const product = await productModel.findByIdAndDelete(productId);

  if (!product) {
    next(new HandleError("Product Not Found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

//? Get Single Product
export const getSingleProduct = handleAsyncError(async function (req, res, next) {
  const productId = req.params.id;

  const product = await productModel.findById(productId);

  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Get Product Successfull",
    product,
  });
});
