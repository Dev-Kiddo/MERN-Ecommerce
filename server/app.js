import express from "express";
import handleErrorMiddleware from "./middlewares/error.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/orderRoutes.js";
// import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(fileUpload());

// Routes
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

// Err Handeling Middleware
app.use(handleErrorMiddleware);

export default app;
