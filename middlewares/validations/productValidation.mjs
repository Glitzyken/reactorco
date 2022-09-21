import { body } from "express-validator";

import AppError from "../../utils/appError.mjs";

export const productValidator = [
  body("name").exists().withMessage("Product name is required.").trim(),
  body("price").exists().withMessage("Product price is required.").trim(),
];
