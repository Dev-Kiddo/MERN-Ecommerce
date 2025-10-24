import mongoose from "mongoose";

export const connectDb = async function () {
  const data = await mongoose.connect(process.env.MONGO_URI);

  console.log(`${data.connection.host} db connected successfully`);
};

// const productSchema = new mongoose.Schema({});
