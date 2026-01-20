import express from "express"
import { jobValidator } from "../validators/job.validator.mjs"
import validate from "../middlewares/validate.mjs"
import { protect,authorize } from "../middlewares/auth.miidleware.mjs"
import {createJob,getAllJobs,getMyJobs} from "../controllers/job.controller.mjs"

const router = express.Router()

router.post("/jobs",protect,authorize("recruiter"),jobValidator,validate,createJob)
router.get("/jobs",protect,getAllJobs)
router.get("/my-jobs", protect, authorize("recruiter"), getMyJobs);

export default router