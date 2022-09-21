import { body } from "express-validator";

import AppError from "../../utils/appError.mjs";

export const otherFields = [
  body("firstName").exists().withMessage("First name is required.").trim(),
  body("lastName").exists().withMessage("Last name is required.").trim(),
  body("email")
    .exists()
    .withMessage("Email address is required.")
    .isEmail()
    .withMessage("Please, provide a valid email."),
];

export const loginCheck = [
  body("email")
    .exists()
    .withMessage("email addess is required")
    .isEmail()
    .withMessage("Please, provide a valid email."),
  body("password").exists().withMessage("Password is required."),
];

export const passwordFields = [
  body("passwordConfirm")
    .exists()
    .withMessage("Password confirmation is required."),
  body("password")
    .exists()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

export const filterMaliciousEntries = async (req, res, next) => {
  // prevent user from making himself ADMIN
  if (req.body.role) {
    req.body.role = "USER";
  }

  next();
};

export const passwordMiddleware = async (req, res, next) => {
  if (req.body.passwordConfirm !== req.body.password) {
    next(new AppError("Password confirmation does not match password.", 400));
    return;
  }

  next();
};
