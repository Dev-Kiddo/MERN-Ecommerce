export default (err, req, res, next) => {
  // console.log("Error Middleware:", err);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
