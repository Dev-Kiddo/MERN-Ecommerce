import productModel from "../models/productModel.js";

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
export const updateProduct = async function (req, res) {
  const productId = req.params.id;

  try {
    let product = await productModel.findById(productId);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product Not Found",
      });
    }

    product = await productModel.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true }).lean();

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
    let product = await productModel.findById(productId);

    if (!product) {
      return res.status(50).json({
        success: false,
        message: "Product Not Found",
      });
    }

    product = await productModel.findByIdAndDelete(productId);

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
