class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (statusCode, message) => {
  return new CustomError(statusCode, message);
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError)
    return res.status(err.statusCode).json({ message: err.message });
  return res
    .status(500)
    .json({ message: "Something went wrong, please try again" });
};

module.exports = { errorHandler, createCustomError };
