import mongoose from "mongoose";

export const connectDb = async function () {
  try {
    const data = await mongoose.connect(process.env.MONGO_URI);

    console.log(`${data.connection.host} db connected successfully`);
  } catch (err) {
    console.log("Database Err:", err.message);
  }
};

// const productSchema = new mongoose.Schema({});
