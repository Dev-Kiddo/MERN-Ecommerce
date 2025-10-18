import express from "express";
import productRouter from "./routes/productRoutes.js";
import errorHandleMiddleware from "./utils/handleError.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1", productRouter);

app.use(errorHandleMiddleware);

export default app;
