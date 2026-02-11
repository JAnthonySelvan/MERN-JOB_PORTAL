import { User } from "../models/user.model.mjs";
import { Job } from "../models/job.model.mjs";
import { Application } from "../models/application.model.mjs";

import { sendEmail } from "../utils/sendEmail.mjs";

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
    const recruiters = await User.find({ role: "recruiter" })
      .select("name email status createdAt")
      .sort({ createdAt: -1 });

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

    if (status === "approved") {
      try {
        sendEmail({
          to: recruiter.email,
          subject: "Recruiter Account Approved",
          html: `
    <h3>Congratulations!</h3>
    <p>Your recruiter account has been approved. You can now post jobs.</p>
  `,
        });
      } catch (error) {
        console.log("Email failed", error.message);
      }
    }

    res.status(200).json({
      success: true,
      recruiter,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminAnalytics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalRecruiters = await User.countDocuments({ role: "recruiter" });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      success: true,
      analytics: {
        totalUsers,
        totalRecruiters,
        totalJobs,
        totalApplications,
      },
    });
  } catch (error) {
    next(error);
  }
};