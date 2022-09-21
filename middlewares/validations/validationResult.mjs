import { validationResult } from "express-validator";
import AppError from "../../utils/appError.mjs";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = [];
    errors.array().forEach((el) => {
      messages.push(el.msg);
    });

    next(new AppError(`${messages.join(" ")}`, 400));
    return;
  }

  next();
};
