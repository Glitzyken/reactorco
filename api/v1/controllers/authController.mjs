    import User from "../../../models/userModel.mjs";
    import catchAsync from "../../../utils/catchAsync.mjs";
    import createSendToken from "../../../utils/createSendToken.mjs";
    import AppError from "../../../utils/appError.mjs";

    export const signup = catchAsync(async (req, res, next) => {
    const userEmail = req.body.email;

    const completeUser = await User.create({
        email: userEmail,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(completeUser, 201, req, res);
    });

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect login credentials.", 401));
  }

  createSendToken(user, 200, req, res);
});

export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
