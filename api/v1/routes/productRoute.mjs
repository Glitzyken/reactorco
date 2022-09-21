import { Router } from "express";

import * as productController from "../controllers/productController.mjs";
import protect from "../../../middlewares/protect.mjs";
import restrictTo from "../../../middlewares/restrictTo.mjs";
import { productValidator } from "../../../middlewares/validations/productValidation.mjs";
import validationResult from "../../../middlewares/validations/validationResult.mjs";

const router = Router();

router.use(protect);

router.route("/").get(productController.getProducts);

router.use(restrictTo("Admin", "SuperAdmin"));

router
  .route("/")
  .post(productValidator, validationResult, productController.createProduct);

router.use(restrictTo("SuperAdmin"));

router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
