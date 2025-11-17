export const sendToken = function (user, statusCode, res) {
  const token = user.getJWTToken();
  const isProduction = process.env.NODE_ENV === "production";

  //   Options for cookies

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
