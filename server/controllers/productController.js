import productModel from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middlewares/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import userModel from "../models/userModel.js";

// http://localhost:5000/api/v1/product/68f2640e0f43a979abb69db7?keyword=shirt - after the question mark is a query. before the question mark as URL.

//? Creating Products
export const addProduct = handleAsyncError(async function (req, res, next) {
  // console.log(req.body);

  req.body.user = req.user.id;

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
  const totalPages = Math.ceil(productCount / resultsPerpage); //Rounds up next whole number.Example, ceil(4.3) is 5.
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    return next(new HandleError("This page doesn't exist", 404));
  }

  // Applying  pagination
  apiFeatures.pagination(resultsPerpage);

  // Execute Query
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

// 6. Admin - Getting all products
export const getAdminProducts = handleAsyncError(async function (req, res, next) {
  const products = await productModel.find({});

  res.status(200).json({
    success: true,
    numOfProducts: products.length,
    products,
  });
});

// 7. Creating and Updating reviews
export const createProductReview = handleAsyncError(async function (req, res, next) {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productModel.findById(productId);

  if (!product) {
    return next(new HandleError("Product not found", 400));
  }

  // console.log(product);

  const reviewExists = product.reviews.find((review) => {
    console.log("review", review.user.toString());

    return review.user.toString() === req.user.id;
  });

  // console.log("reviewExists:", reviewExists);

  if (reviewExists) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id) {
        (review.rating = rating), (review.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = product.reviews.length;

  let sum = 0;

  product.reviews.forEach((rev) => (sum += rev.rating));

  product.ratings = product.reviews.length > 0 ? sum / product.reviews.length : 0;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
  });
});

// 8. Getting reviews
export const getProductReviews = handleAsyncError(async function (req, res, next) {
  const { id } = req.query;

  const product = await productModel.findById(id);

  if (!product) {
    return next(new HandleError("Product not found", 400));
  }

  res.status(200).json({
    success: true,
    numOfReviews: product.numOfReviews,
    AverageRating: product.ratings,
    reviews: product.reviews,
  });
});

// 8. Deleting Product reviews
export const deleteProductReview = handleAsyncError(async function (req, res, next) {
  const { productId, id } = req.query;

  const product = await productModel.findById(productId);

  // console.log("product:", product);

  if (!product) {
    return next(new HandleError("Product not found", 400));
  }

  const reviews = product.reviews.filter((rev) => rev._id.toString() !== id);

  let sum = 0;

  reviews.forEach((rev) => {
    sum += rev.rating;
  });

  const ratings = reviews.length > 0 ? sum / reviews.length : 0;

  const numOfReviews = reviews.length;

  // product.reviews = review;
  // product.ratings = ratings;
  // product.numOfReviews = review.length;

  // await product.save({ validateBeforeSave: false });

  const updatedProduct = await productModel.findByIdAndUpdate(
    productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
    updatedProduct,
  });
});
