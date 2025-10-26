import handleAsyncError from "../middlewares/handleAsyncError.js";
import userModel from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";

// Register User
export const registerUser = handleAsyncError(async function (req, res, next) {
  const { name, email, password } = req.body;

  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is temp id",
      url: "This is temp URL",
    },
  });

  //   const token = user.getJWTToken();

  //   res.status(201).json({
  //     success: true,
  //     message: "User created successfully",
  //     user,
  //     token,
  //   });

  sendToken(user, 201, res);
});

// Login User
export const loginUser = handleAsyncError(async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HandleError("Email or Password cannot be empty", 400));
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }

  const isPasswordValid = await user.verifyPassword(password);

  if (!isPasswordValid) {
    return next(new HandleError("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout user

export const logoutUser = handleAsyncError(async function (req, res, next) {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
});
