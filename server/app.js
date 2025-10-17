import express from "express";
import productRouter from "./routes/productRoutes.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1", productRouter);

export default app;
