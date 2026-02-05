import { Application } from "../models/application.model.mjs";
import { Job } from "../models/job.model.mjs";
import AppError from "../utils/AppError.mjs";
import { sendEmail } from "../utils/sendEmail.mjs";

export const applyJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate("recruiter", "name email");
    if (!job) {
      next(new AppError("Job Not Found", 404));
    }
    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      recruiter: job.recruiter,
    });
    try {
      await sendEmail({
        to: req.user.email,
        subject: "Application Submitted Successfully",
        html: `
      <h3>Application Submitted</h3>
      <p>You have successfully applied for:</p>
      <p><b>${job.title}</b></p>
      <p>We will notify you once the recruiter responds.</p>
    `,
      });
    } catch (err) {
      console.log("Applicant email failed:", err.message);
    }

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
      .populate("applicant", "name email resume")
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

export const getUserApplications = async (req, res, next) => {
  try {
    // const role = req.user.role

    // if(role === "recruiter"){
    const applications = await Application.find({
      applicant: req.user._id,
    }).select("job");
    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecruiterApplication = async (req, res, next) => {
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
    )
      .populate("applicant", "name email")
      .populate("job", "title location");
    if (!application) {
      return next(new AppError("Application not found", 404));
    }
    try {
      await sendEmail({
        to: application.applicant.email,
        subject: "Application Status Updated",
        html: `
    <h3>Status Update</h3>
    <p>Your application for <b>${application.job.title}</b> has been 
    <b>${application.status}</b>.</p>
  `,
      });
    } catch (error) {
      console.log("Email failed:", error.message);
    }
    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};
