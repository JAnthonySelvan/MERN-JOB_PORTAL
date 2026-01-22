import { Application } from "../models/application.model.mjs";
import { Job } from "../models/job.model.mjs";
import AppError from "../utils/AppError.mjs";

export const applyJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      next(new AppError("Job Not Found", 404));
    }
    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      recruiter: job.recruiter,
    });
    return res.status(201).json({
      success: true,
      message: "Job Applied Successfully",
      application,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(new AppError("You already applied this Job", 400));
    }
    next(error);
  }
};

export const getApplicantsByJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({
      job: jobId,
      recruiter: req.user._id,
    })
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    if (!applications) {
      return next(new AppError("Invalid jobId", 404));
    }
    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ recruiter: req.user._id })
      .populate("job", "title location")
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["shortlisted", "rejected"].includes(status)) {
      return next(new AppError("Invalid Status update!", 400));
    }
    const application = await Application.findOneAndUpdate(
      { _id: applicationId, recruiter: req.user.id },
      { status },
      { new: true },
    );
    if (!application) {
      return next(new AppError("Application not found", 404));
    }
    return res.status(200).json({
        success : true,
        message : "Application updated successfully",
        application
    })
  } catch (error) {
    next(error);
  }
};
