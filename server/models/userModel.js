import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your name"],
      maxLength: [25, "Invalid name, Please enter a name with fewer that 25 characters"],
      minLength: [3, "Name should contain more than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter your password"],
      minLength: [4, "Password should be greater that 4 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      typr: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// const userModel = mongoose.model("user", userSchema);
// export default userModel;

export default mongoose.model("user", userSchema);
