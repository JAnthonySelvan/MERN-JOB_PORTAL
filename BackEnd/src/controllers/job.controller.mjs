import { Job } from "../models/job.model.mjs";
import { Application } from "../models/application.model.mjs";
import AppError from "../utils/AppError.mjs";
import { User } from "../models/user.model.mjs";

export const createJob = async(req,res,next)=>{
    try{
        if (req.user.role === "recruiter" && req.user.status !== "approved") {
          return res.status(403).json({
            message: "Recruiter approval pending",
          });
        }

        const job = await Job.create({...req.body,recruiter:req.user._id})
        res.status(201).json({
          success: true,
          job,
        });
    }
    catch(error){
        next(error)
    }

}

export const getAllJobs =async(req,res,next)=>{
    try{
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const queryObj = {};

        // keyword
        if (
          req.query.keyword &&
          req.query.keyword !== "undefined" &&
          req.query.keyword.trim() !== ""
        ) {
          queryObj.title = {
            $regex: req.query.keyword.trim(),
            $options: "i",
          };
        }

        // location
        if (
          req.query.location &&
          req.query.location !== "undefined" &&
          req.query.location.trim() !== ""
        ) {
          queryObj.location = {
            $regex: req.query.location.trim(),
            $options: "i",
          };
        }

        // console.log("REQ QUERY:", req.query);
        // console.log("QUERY OBJ:", queryObj);


        const totalJobs = await Job.countDocuments(queryObj)
        const jobs = await Job.find(queryObj).populate("recruiter","name email").sort({createdAt:-1}).skip(skip).limit(limit)
        res.status(200).json({
            success : true,
            jobs,
            page,
            pages:Math.ceil(totalJobs/limit),
            totalJobs
        })
    }
    catch(error){
        next(error)
    }
}

export const getMyJobs = async(req,res,next)=>{
    try{
        const jobs = await Job.find({recruiter:req.user._id})
        res.status(200).json({
            success : true,
            jobs
        })
    }
    catch(error){
        next(error)
    }
}

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      job: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();
    
    await Application.updateMany(
      { job: jobId },
      { $set: { jobDeleted: true } },
    );
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const toggleSaveJob = async (req, res, next) => {
  const { jobId } = req.params;

  const user = await User.findById(req.user._id);

  const alreadySaved = user.savedJobs.includes(jobId);

  if (alreadySaved) {
    user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
  } else {
    user.savedJobs.push(jobId);
  }

  await user.save();

  res.status(200).json({
    success: true,
    savedJobs: user.savedJobs,
  });
};

export const getSavedJobs = async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "savedJobs",
    match: { isDeleted: false }, 
  });

  res.status(200).json({
    success: true,
    jobs: user.savedJobs,
  });
};
