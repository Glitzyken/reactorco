import { promisify } from "util";
import jwt from "jsonwebtoken";

import User from "../models/userModel.mjs";
import AppError from "../utils/appError.mjs";

export default async (req, res, next) => {
  // Get token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    next(new AppError("Unauthorized.", 401));
    return;
  }

  console.log(token);

  // Verification token
  if (token) {
    let decoded;

    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (err) {
      next(new AppError(err.message, 401));
      return;
    }

    // RETURN IF TOKEN HAS EXPRIRED
    if (Date.now() >= decoded.exp * 1000) {
      next(new AppError("Token expired.", 401));
      return;
    }

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      next(
        new AppError("The user belonging to this token no longer exists.", 401)
      );
      return;
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
  }

  next();
};
