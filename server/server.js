import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import { connectDb } from "./config/db.js";

const port = process.env.PORT || 4000;

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${port}`);

  connectDb();
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Server is shuting down, due to unhandeled promise rejection");
  server.close(() => process.exit(1));
});
