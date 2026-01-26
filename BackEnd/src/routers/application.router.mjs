import { applyJob,getApplicantsByJob,getMyApplications,updateApplicationStatus } from "../controllers/application.controller.mjs";
import express from "express"
import {protect,authorize} from "../middlewares/auth.miidleware.mjs"

const router = express.Router()

router.post("/:jobId",protect,authorize("user"),applyJob)
router.post("/job/:jobId",protect,authorize("recruiter"),getApplicantsByJob)
router.get("/me",protect,authorize("recruiter","user"),getMyApplications)
router.post("/:applicationId/status",protect,authorize("recruiter"),updateApplicationStatus)

export default router