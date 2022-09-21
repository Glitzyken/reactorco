import AppError from "../utils/appError.mjs";

export default (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Access denied.", 403));
    }

    next();
  };
};
