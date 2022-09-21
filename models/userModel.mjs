import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please, provide an email."],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please, provide a valid email address."],
    },
    firstName: {
      type: String,
      trim: true,
      validate: [
        validator.isAlpha,
        "First name must not contain a space or any non-alphabetic character.",
      ],
    },
    lastName: {
      type: String,
      trim: true,
      validate: [
        validator.isAlpha,
        "Last name must not contain a space or any non-alphabetic character.",
      ],
    },
    role: {
      type: String,
      enum: ["User", "Admin", "SuperAdmin"],
      default: "User",
    },
    password: {
      type: String,
      required: [true, "Please, provide a password."],
      minlength: [8, "Password must be at least 8 characters."],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please, confirm your password."],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password and passwordConfirm are not the same!",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
