import express from "express";
import productRouter from "./routes/productRoutes.js";
import handleErrorMiddleware from "./middlewares/error.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1", productRouter);

// Err Handeling Middleware
app.use(handleErrorMiddleware);

export default app;
