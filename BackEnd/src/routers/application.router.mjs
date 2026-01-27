import { applyJob,getApplicantsByJob,getRecruiterApplication,getUserApplications,updateApplicationStatus } from "../controllers/application.controller.mjs";
import express from "express"
import {protect,authorize} from "../middlewares/auth.miidleware.mjs"

const router = express.Router()

router.post("/:jobId",protect,authorize("user"),applyJob)
router.post("/job/:jobId",protect,authorize("recruiter"),getApplicantsByJob)
router.get("/user/myjobs",protect,authorize("user"),getUserApplications)
router.get("/recruiter/myjobs", protect, authorize("recruiter"), getRecruiterApplication);
router.patch("/:applicationId/status",protect,authorize("recruiter"),updateApplicationStatus)

export default router