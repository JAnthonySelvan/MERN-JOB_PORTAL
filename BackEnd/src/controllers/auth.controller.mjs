import bcrypt from "bcryptjs";
import { User } from "../models/user.model.mjs";
import generateToken from "../utils/generateToken.mjs";
import AppError from "../utils/AppError.mjs";
import { sendEmail } from "../utils/sendEmail.mjs";
import crypto from "crypto";

export const register = async (req, res, next) => {
  // console.log("validate typeof next:", typeof next);
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new AppError("Email already Rigisterd!", 400));
  }

  await User.create({ name, email, password, role });

  res.status(201).json({
    success: true,
    messsage:
      role === "recruiter"
        ? "Recruiter Registerd waiting for Admin approval"
        : "User Registerd successfully",
  });
  if (role === "user") {
    try {
      sendEmail({
        to: email,
        subject: "Welcome to Job Junction 🎉",
        html: `
    <h3>Welcome ${name}</h3>
    <p>Your account has been created successfully.</p>
    <p>Role: ${role}</p>
  `,
      });
    } catch (error) {
      console.log("Email failed", error.message);
    }
  }
  if (role === "recruiter") {
    try {
      sendEmail({
        to: email,
        subject: "Welcome to Job Junction 🎉",
        html: `
    <h3>Welcome ${name}</h3>
    <p>Your account has been created successfully.</p>
    <p>Role: ${role}</p>
    <p>Please Wait for admin approval</p>
  `,
      });
    } catch (error) {
      console.log("Email failed", error.message);
    }
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid Credentials!", 401));
  }
  if (!user.isActive) {
    return next(new AppError("User in Inactive", 403));
  }
  if (user.role === "recruiter" && user.status === "pending") {
    return next(new AppError("Recruiter yet not approved!", 403));
  }
  if (user.role === "recruiter" && user.status === "rejected") {
    return next(new AppError("Your approval was rejected by admin!", 403));
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return next(new AppError("Invalid Credentials", 401));
  }

  generateToken(res, user._id);

  res.status(200).json({
    success: true,
    messsage: "Login Successful",
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({ success: true });
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  try {
    sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `
      <p>You requested a password reset</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link expires in 15 minutes</p>
    `,
    });
  } catch (error) {
    console.log("Email Failed");
  }
  res.json({ success: true, message: "Reset link sent" });
};

export const resetPassword = async (req, res, next) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({ success: true, message: "Password updated" });
};