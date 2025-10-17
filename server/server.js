import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./server/config/config.env" });

const port = process.env.PORT || 4000;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${port}`);
});
