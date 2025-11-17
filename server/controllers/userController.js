import handleAsyncError from "../middlewares/handleAsyncError.js";
import userModel from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";

// Register User
export const registerUser = handleAsyncError(async function (req, res, next) {
  console.log(req.body);

  const { name, email, password, avatar } = req.body;

  const myCloud = await cloudinary.uploader.upload(avatar, {
    folder: "ShopIQ",
    width: 256,
    crop: "scale",
  });

  console.log("myCloud:", myCloud);

  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
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

// Forgot Password
export const requestPasswordReset = handleAsyncError(async function (req, res, next) {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new HandleError("user doesn't exist", 400));
  }

  let resetToken;

  try {
    resetToken = user.getResetToken();
    await user.save({ validateBeforeSave: false });
  } catch (err) {
    console.log(err);

    return next(new HandleError("Couldn't save reset token, try again later", 500));
  }

  const resetPasswordURL = `${req.protocol}://${req.get("host")}/reset/${resetToken}`;

  const message = `Use the following link to reset your password: ${resetPasswordURL} \n\n This Link will expire in 30 minutes. \n\n If you didn't request a password reset, Please ignore this message`;

  try {
    // Send Email
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email is sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new HandleError("Email couldn't be sent, please try again later", 500));
  }
});

// Reset password
export const resetPassword = handleAsyncError(async function (req, res, next) {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await userModel.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

  if (!user) {
    return next(new HandleError("Reset password Token is invalid or has been expired", 400));
  }

  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new HandleError("Password does not match", 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Details
export const getUserDetails = handleAsyncError(async function (req, res, next) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update Passsword
export const updateUserPassword = handleAsyncError(async function (req, res, next) {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await userModel.findById(req.user.id).select("+password");

  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new HandleError("Please fill all the fields", 401));
  }

  const checkPasswordMatch = await user.verifyPassword(oldPassword);

  if (!checkPasswordMatch) {
    return next(new HandleError("Old password is incorrect", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new HandleError("Password doesn't match", 400));
  }

  user.password = newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Updating user Profile

export const updateProfile = handleAsyncError(async function (req, res, next) {
  const { name, email, avatar } = req.body;

  if (avatar) {
    const user = await userModel.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.uploader.destroy(imageId);
  }

  const myCloud = await cloudinary.uploader.upload(avatar, {
    folder: "ShopIQ",
    width: 256,
    crop: "scale",
  });

  const updateUserDetails = {
    name,
    email,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  };

  const user = await userModel.findByIdAndUpdate(req.user.id, updateUserDetails, { new: true, runValidators: true });

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

//7. Admin - Get All users information
export const getUsersList = handleAsyncError(async function (req, res, next) {
  const users = await userModel.find({});

  res.status(200).json({
    success: true,
    numOfUsers: users.length,
    users,
  });
});

//8. Admin - Get Single user information
export const getSingleUser = handleAsyncError(async function (req, res, next) {
  const id = req.params.id;

  const user = await userModel.findById(id);

  if (!user) {
    return next(new HandleError(`User doesn't exist with this id: ${id}`, 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// 9. Admin - Assign Roles
export const updateUserRole = handleAsyncError(async function (req, res, next) {
  const { role } = req.body;

  const newUserData = {
    role,
  };

  const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true });

  if (!user) {
    return next(new HandleError(`User doesn't exist with this id: ${id}`, 400));
  }

  user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    user,
  });
});

// 10.Admin - Deleting User Account

export const DeleteUser = handleAsyncError(async function (req, res, next) {
  const { id } = req.params;

  const user = await userModel.findByIdAndDelete(id);

  if (!user) {
    return next(new HandleError(`User doesn't exist with this id: ${id}`, 400));
  }

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

// 11.Send Contact Message

export const sendContactMessage = handleAsyncError(async function (req, res, next) {
  const { email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.SMTP_MAIL, // YOU receive it here
    subject,
    text: `
Email: ${email}
Message: ${message}
      `,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({
    success: true,
    message: "Message sent successfully!",
  });
});
