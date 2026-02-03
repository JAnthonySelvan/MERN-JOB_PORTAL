import { User } from "../models/user.model.mjs";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" }).select(
      "name email createdAt",
    );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRecruiters = async (req, res, next) => {
  try {
    const recruiters = await User.find({ role: "recruiter" }).select(
      "name email createdAt",
    );

    res.status(200).json({
      success: true,
      recruiters,
    });
  } catch (error) {
    next(error);
  }
};
