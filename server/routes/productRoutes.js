import express from "express";
import {
  addProduct,
  createProductReview,
  deleteProduct,
  deleteProductReview,
  getAdminProducts,
  getAllProducts,
  getProductReviews,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { verifyUserAuth, roleBasedAccess } from "../middlewares/userAuth.js";

const router = express.Router();

//  Getting all products
router.route("/products").get(getAllProducts);

// Get Single Product
router.route("/product/:id").get(getSingleProduct);

// Product Reviews
router.route("/review").put(verifyUserAuth, createProductReview);
router.route("/reviews").get(getProductReviews).delete(verifyUserAuth, deleteProductReview);

// Admin - Getting all products
router.route("/admin/products").get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);

// Admin - Get Single Product
router.route("/admin/product/:id").get(verifyUserAuth, roleBasedAccess("admin"), getSingleProduct);

// Admin - Create new Product
router.route("/admin/product/create").post(verifyUserAuth, roleBasedAccess("admin"), addProduct);

// Admin - Update and Delete Product
router.route("/admin/product/:id").put(verifyUserAuth, roleBasedAccess("admin"), updateProduct).delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);

export default router;
