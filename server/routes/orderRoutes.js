import express from "express";
import { createNewOrder, allMyOrders, getSignleOrder } from "../controllers/orderController.js";
import { verifyUserAuth, roleBasedAccess } from "../middlewares/userAuth.js";
const router = express.Router();

router.route("/new/order").post(verifyUserAuth, createNewOrder);

router.route("/admin/order/:id").post(verifyUserAuth, roleBasedAccess("admin"), getSignleOrder);

router.route("/orders/user").get(verifyUserAuth, allMyOrders);

export default router;
