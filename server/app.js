import express from "express";
import handleErrorMiddleware from "./middlewares/error.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/orderRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import cors from "cors";
import fileUpload from "express-fileupload";

import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const app = express();
const allowedOrigins = ["http://localhost:5173"];

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);

// Err Handeling Middleware
app.use(handleErrorMiddleware);

export default app;
