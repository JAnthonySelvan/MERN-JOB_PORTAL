import { Application } from "../models/application.model.mjs";
import { Job } from "../models/job.model.mjs";
import AppError from "../utils/AppError.mjs";
import { sendEmail } from "../utils/sendEmail.mjs";
import { generateInterviewICS } from "../utils/generateInterviewICS.mjs";

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
       sendEmail({
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
   
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate({path:"job",select:"title location"})
      .populate("recruiter", "name email")
      .sort({ createdAt: -1 });;
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
       sendEmail({
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

export const scheduleInterview = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { mode, date, time, link, location } = req.body;

    const application = await Application.findOne({
      _id: applicationId,
      recruiter: req.user._id,
      status: "shortlisted",
    }).populate("applicant","email name");

    if (!application) {
      return next(new AppError("Application not found", 404));
    }
    if (application.interview) {
      return next(new AppError("Interview already scheduled", 400));
    }

    application.interview = {
      mode,
      date,
      time,
      link: mode === "online" ? link : null,
      location: mode === "offline" ? location : null,
      status: "scheduled",
    };

    await application.save();
    const icsContent = await generateInterviewICS(
      application.interview,
      application.applicant.email,
    );
try{
 sendEmail({
      to: application.applicant.email,
      subject: "Interview Scheduled – Job Junction",
      html: `
    <h3>Interview Scheduled</h3>
    <p>Hello ${application.applicant.name},</p>
    <p>Your interview has been scheduled.</p>
    <p><b>Mode:</b> ${application.interview.mode}</p>
    <p><b>Date:</b> ${new Date(application.interview.date).toDateString()}</p>
    <p><b>Time:</b> ${application.interview.time}</p>
  `,
      attachments: [
        {
          filename: "interview.ics",
          content: icsContent,
          contentType: "text/calendar",
        },
      ],
    });
}
   catch(err){
        console.log("Email failed")
   } 

    res.status(200).json({
      success: true,
      interview: application.interview,
    });
  } catch (error) {
    next(error);
  }
};

export const respondInterview = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body; 

    const application = await Application.findOne({
      _id: applicationId,
      applicant: req.user._id,
    });

    if (!application || !application.interview) {
      return next(new AppError("Interview not found", 404));
    }

    application.interview.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Interview ${status}`,
    });
  } catch (error) {
    next(error);
  }
};

export const editInterview = async (req, res, next) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findOne({
      _id: applicationId,
      recruiter: req.user._id,
    }).populate("applicant" ,"name email");

    if (!application || !application.interview) {
      return next(new AppError("Interview not found", 404));
    }

    Object.assign(application.interview, req.body);
    application.interview.status = "scheduled"; 

    await application.save();
    const icsContent = await generateInterviewICS(
      application.interview,
      application.applicant.email,
    );
   try {
      sendEmail({
       to: application.applicant.email,
       subject: "Interview ReScheduled – Job Junction",
       html: `
    <h3>Interview Scheduled</h3>
    <p>Hello ${application.applicant.name},</p>
    <p>Your interview has been scheduled.</p>
    <p><b>Mode:</b> ${application.interview.mode}</p>
    <p><b>Date:</b> ${new Date(application.interview.date).toDateString()}</p>
    <p><b>Time:</b> ${application.interview.time}</p>
  `,
       attachments: [
         {
           filename: "interview.ics",
           content: icsContent,
           contentType: "text/calendar",
         },
       ],
     });
   } catch (err) {
     console.log("Email failed");
   }

    res.status(200).json({
      success: true,
      interview: application.interview,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelInterview = async (req, res, next) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findOne({
      _id: applicationId,
      recruiter: req.user._id,
    });

    if (!application || !application.interview) {
      return next(new AppError("Interview not found", 404));
    }

    application.interview = null;
    await application.save();

    res.status(200).json({
      success: true,
      message: "Interview cancelled",
    });
  } catch (error) {
    next(error);
  }
};

