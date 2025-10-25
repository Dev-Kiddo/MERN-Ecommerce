import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Hashing Password
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  //1st scenerio - updating profile(name,email,image)
  //2nd scenerio - updating password
  if (!this.isModified("password")) {
    return next();
  }
});

// Creating JSON WEB TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Comparing Password
userSchema.methods.verifyPassword = async function (userEnteredPassword) {
  return await bcrypt.compare(userEnteredPassword, this.password);
};

// const userModel = mongoose.model("user", userSchema);
// export default userModel;

export default mongoose.model("user", userSchema);
