import productModel from "../models/productModel.js";
import HandleError from "../utils/handleError.js";

//? Creating Products
export const addProduct = async function (req, res) {
  console.log(req.body);

  try {
    const product = await productModel.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Add Product Failed",
      error: err.message,
    });
  }
};

//? Get Products
export const getAllProducts = async function (req, res) {
  try {
    const products = await productModel.find({});

    return res.status(200).json({
      success: true,
      message: "Get All Products Successfull",
      numofProducts: products.length,
      products,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Get All Products Failed",
      error: err.message,
    });
  }
};

//? Update Products
export const updateProduct = async function (req, res, next) {
  const productId = req.params.id;

  try {
    // let product = await productModel.findById(productId);

    // if (!product) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "Product Not Found",
    //   });
    // }

    const product = await productModel.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true }).lean();

    if (!product) {
      // return res.status(500).json({
      //   success: false,
      //   message: "Product Not Found",
      // });
      next(new HandleError("Product Not Found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Update Product Successfull",
      product,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Update Product Failed",
      error: err.message,
    });
  }
};

//? Delete Products
export const deleteProduct = async function (req, res) {
  const productId = req.params.id;

  try {
    // let product = await productModel.findById(productId);
    const product = await productModel.findByIdAndDelete(productId);

    if (!product) {
      // return res.status(50).json({
      //   success: false,
      //   message: "Product Not Found",
      // });

      next(new HandleError("Product Not Found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Product Delete Failed",
      error: err.message,
    });
  }
};

//? Get Single Product
export const getSingleProduct = async function (req, res) {
  const productId = req.params.id;

  try {
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(50).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get Product Successfull",
      product,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Get Product Failed",
      error: err.message,
    });
  }
};
