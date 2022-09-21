import User from "../../../models/userModel.mjs";
import catchAsync from "../../../utils/catchAsync.mjs";
import AppError from "../../../utils/appError.mjs";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const promoteUserToAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = {
    role: "Admin",
  };
  
  const user = await User.findById(id);

  if (!user) return next(new AppError("User not found.", 404));
  
  user.role = "Admin";
  user.save();


  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) return next(new AppError("User not found.", 404));

  await User.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Deleted",
  });
});
