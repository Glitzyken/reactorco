import { Router } from "express";

import authRouter from "./authRoute.mjs";
import userRouter from "./userRoute.mjs";
import productRouter from "./productRoute.mjs";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;
