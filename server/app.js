import express from "express";
import handleErrorMiddleware from "./middlewares/error.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);

// Err Handeling Middleware
app.use(handleErrorMiddleware);

export default app;
