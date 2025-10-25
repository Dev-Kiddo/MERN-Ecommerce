import userModel from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken";

export const verifyUserAuth = handleAsyncError(async function (req, res, next) {
  const { token } = req.cookies;
  //   console.log(token);

  if (!token) {
    return next(new HandleError("Authentication missing, Please login to access resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

//   console.log("decodedData:", decodedData);

  req.user = await userModel.findById(decodedData.id);

    next();
});
