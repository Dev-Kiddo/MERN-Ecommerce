import productModel from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middlewares/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

//? Creating Products
export const addProduct = handleAsyncError(async function (req, res, next) {
  let images = [];

  // console.log(req.files);

  // handle both single and multiple files
  if (!req.files || !req.files.image) {
    return res.status(400).json({ success: false, message: "No images uploaded" });
  }

  const uploadedImages = req.files.image;

  // If single file uploaded → make it array
  if (!Array.isArray(uploadedImages)) {
    images.push(uploadedImages);
  } else {
    images = uploadedImages;
  }

  // console.log("req.files.image:", req.files.image);

  const imageLinks = [];

  for (let i = 0; i < images.length; i++) {
    // ✅ Important: use tempFilePath here
    const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
      folder: "ShopIQ/products",
    });

    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  // console.log("imageLinks:", imageLinks);

  req.body.image = imageLinks;
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
  const resultsPerpage = 4;

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
  console.log("req.body", req.body);

  let product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  let images = [];

  if (!req.files || !req.files.image) {
    return res.status(400).json({ success: false, message: "No images uploaded" });
  }

  const uploadedImages = req.files.image;

  let updatedLinks = [];

  // If single file uploaded → make it array
  if (!Array.isArray(uploadedImages)) {
    images.push(uploadedImages);
  } else {
    images = uploadedImages;
  }

  if (images.length > 0) {
    // Deleting the previous uploaded images
    for (let i = 0; i < product.image.length; i++) {
      await cloudinary.uploader.destroy(product.image[i].public_id);
    }

    // Upload new Uploaded images
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
        folder: "ShopIQ/products",
      });

      updatedLinks.push({ public_id: result.public_id, url: result.secure_url });
    }
  }

  req.body.image = updatedLinks;

  const productId = req.params.id;

  product = await productModel.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });

  // console.log("product:", product);

  if (!product) {
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
    productId,
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
