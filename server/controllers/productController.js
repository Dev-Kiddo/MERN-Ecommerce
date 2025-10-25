import productModel from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middlewares/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

// http://localhost:5000/api/v1/product/68f2640e0f43a979abb69db7?keyword=shirt - after the question mark is a query. before the question mark as URL.

//? Creating Products
export const addProduct = handleAsyncError(async function (req, res, next) {
  // console.log(req.body);

  const product = await productModel.create(req.body);

  return res.status(201).json({
    success: true,
    message: "Product Added Successfully",
    product,
  });
});

//? Get Products
export const getAllProducts = handleAsyncError(async function (req, res, next) {
  // console.log("Req_Query:", req.query); // http://localhost:5000/api/v1/products?keyword=shirt - { keyword: 'shirt' }

  // console.log("queryObj:", productModel.find({}));//so this will actualy simply returs a query object

  // queryObj: Query {
  // _mongooseOptions: {},
  // _transforms: [],
  // _hooks: Kareem { _pres: Map(0) {}, _posts: Map(0),
  //   name: 'products',
  // }

  // console.log("Req_Query:", req.query);

  const resultsPerpage = 3;

  const apiFeatures = new APIFunctionality(productModel.find(), req.query).search().filter();

  // Getting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();
  // console.log(productCount);

  // Calculate totalpages based on filtered count
  const totalPages = Math.ceil(productCount / resultsPerpage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    return next(new HandleError("This page doesn't exist", 404));
  }

  // Applying  pagination
  apiFeatures.pagination(resultsPerpage);

  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new HandleError("No product found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Get All Products Successfull",
    numofProducts: productCount,
    totalPages,
    resultsPerpage,
    currentPage: page,
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

  // console.log("product:", product);

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
