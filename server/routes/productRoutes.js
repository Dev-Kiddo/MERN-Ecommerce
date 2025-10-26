import express from "express";
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";
import { verifyUserAuth, roleBasedAccess } from "../middlewares/userAuth.js";

const router = express.Router();

router.route("/products").get(verifyUserAuth, getAllProducts).post(verifyUserAuth, roleBasedAccess("admin"), addProduct);

router
  .route("/product/:id")
  .get(verifyUserAuth, getSingleProduct)
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);

export default router;
