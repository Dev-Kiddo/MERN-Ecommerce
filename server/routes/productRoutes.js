import express from "express";
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";
import { verifyUserAuth } from "../middlewares/userAuth.js";

const router = express.Router();

router.route("/products").get(verifyUserAuth, getAllProducts).post(addProduct);
router.route("/product/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct);

export default router;
