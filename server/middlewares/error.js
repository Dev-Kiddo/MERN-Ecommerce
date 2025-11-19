import HandleError from "../utils/handleError.js";

export default (err, req, res, next) => {
  console.log("Error Middleware:", err);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // {
  //     "success": false,
  //     "message": "CastError: Cast to ObjectId failed for value \"68f2462c396ada6f7c9651036\" (type string) at path \"_id\" for model \"product\"\n    at SchemaObjectId.cast
  // }

  // CAST ERROR - in getSingleProduct - we pass a wrong product id - will get this type of errr
  if (err.name === "CastError") {
    const message = `This is invalid resource ${err.path}`;

    err = new HandleError(message, 404);
  }

  // DuplicateKey Error
  if (err.code === 11000) {
    console.log(err);

    const message = `This ${Object.keys(err.keyValue)} already registered. Please login to continue`;

    err = new HandleError(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // message: err.stack,
  });
};
