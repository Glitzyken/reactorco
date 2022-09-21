import { Router } from "express";

import * as userController from "../controllers/userController.mjs";
import protect from "../../../middlewares/protect.mjs";
import restrictTo from "../../../middlewares/restrictTo.mjs";
import getMe from "../../../middlewares/getMe.mjs";

const router = Router();

router.use(protect);

router.get("/me", getMe, userController.getUser);

router.use(restrictTo("Admin", "SuperAdmin"));

router.route("/").get(userController.getAllUsers);
router.route("/promote_to_admin/:id").patch(userController.promoteUserToAdmin);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);

export default router;
