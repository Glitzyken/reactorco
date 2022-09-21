import { Router } from "express";

import { signup, login } from "../controllers/authController.mjs";
import * as authValidations from "../../../middlewares/validations/userValidation.mjs";
import validationResult from "../../../middlewares/validations/validationResult.mjs";

const router = Router();

router
  .route("/signup")
  .post(
    authValidations.otherFields,
    authValidations.filterMaliciousEntries,
    validationResult,
    authValidations.passwordFields,
    authValidations.passwordMiddleware,
    signup
  );

router
  .route("/login")
  .post(authValidations.loginCheck, validationResult, login);

export default router;
