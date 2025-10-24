import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import { connectDb } from "./config/db.js";

// Handle Execption Error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Server is shuting down, due to Uncaught Exception Errors");
  process.exit(1); //here we directly exit..
});

// Execption Error
// console.log(prasanth) => this will throw an reference error bcoz- prasanth is not defined anywhere

const port = process.env.PORT || 4000;

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${port}`);

  connectDb();
});

// Handle Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Server is shuting down, due to unhandeled promise rejection");
  server.close(() => process.exit(1)); // here we close the server and then exit
});
