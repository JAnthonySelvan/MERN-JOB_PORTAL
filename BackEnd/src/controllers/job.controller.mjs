import { Job } from "../models/job.model.mjs";
import AppError from "../utils/AppError.mjs";

export const createJob = async(req,res,next)=>{
    try{
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

        console.log("REQ QUERY:", req.query);
        console.log("QUERY OBJ:", queryObj);


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