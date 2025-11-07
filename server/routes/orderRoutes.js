import express from "express";
import { createNewOrder, allMyOrders, getSingleOrder, getAllOrders, updateOrderStatus, deleteOrder } from "../controllers/orderController.js";
import { verifyUserAuth, roleBasedAccess } from "../middlewares/userAuth.js";
const router = express.Router();

router.route("/new/order").post(verifyUserAuth, createNewOrder);

router.route("/admin/order/:id").post(verifyUserAuth, roleBasedAccess("admin"), getSingleOrder).delete(verifyUserAuth, roleBasedAccess("admin"), deleteOrder);

//Get All My Orders
router.route("/admin/orders").get(verifyUserAuth, roleBasedAccess("admin"), getAllOrders);

// Update Order Status
router.route("/admin/update/status/:id").put(verifyUserAuth, roleBasedAccess("admin"), updateOrderStatus);

router.route("/orders/user").get(verifyUserAuth, allMyOrders);

export default router;
