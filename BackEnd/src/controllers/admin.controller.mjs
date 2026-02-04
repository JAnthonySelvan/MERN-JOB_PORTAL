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
      "name email status createdAt",
    );

    res.status(200).json({
      success: true,
      recruiters,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecruiterStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const recruiter = await User.findById(req.params.id);

    if (!recruiter || recruiter.role !== "recruiter") {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    recruiter.status = status;
    await recruiter.save();

    res.status(200).json({
      success: true,
      message: `Recruiter ${status} successfully`,
    });
  } catch (error) {
    next(error);
  }
};

