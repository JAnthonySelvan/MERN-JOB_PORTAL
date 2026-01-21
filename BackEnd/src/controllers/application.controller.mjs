import { Application } from "../models/application.model.mjs";
import { Job } from "../models/job.model.mjs";
import AppError  from "../utils/AppError.mjs"

export const applyJob = async(req,res,next)=>{
    try{
        const {jobId} = req.params;
        const job = await Job.findById(jobId)
        if(!job){
            next(
                new AppError("Job Not Found",404)
            )
        }
        const application = await Application.create(
            {
                job : jobId,
                applicant : req.user._id,
                recruiter : job.recruiter
            }
        )
       return res.status(201).json({
            success : true,
            message : "Job Applied Successfully",
            application
        })
    }
    catch(error){
        if(error.code===11000){
            return next(
                new AppError("You already applied this Job",400)
            )
        }
        next(error)
    }
}