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
        const jobs = await Job.find().populate("recruiter","name email").sort({createdAt:-1})
        res.status(200).json({
            success : true,
            count : jobs.length,
            jobs
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