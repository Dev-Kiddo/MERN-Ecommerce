import handleAsyncError from "../middlewares/handleAsyncError.js";
import userModel from "../models/userModel.js";

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

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
    token,
  });
});
