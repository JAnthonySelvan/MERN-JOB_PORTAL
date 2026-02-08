import {
  applyJob,
  getApplicantsByJob,
  getRecruiterApplication,
  getUserApplications,
  updateApplicationStatus,
  scheduleInterview,
  respondInterview,
  editInterview,cancelInterview
} from "../controllers/application.controller.mjs";
import express from "express";
import { protect, authorize } from "../middlewares/auth.miidleware.mjs";

const router = express.Router();

router.post("/:jobId", protect, authorize("user"), applyJob);
router.post("/job/:jobId", protect, authorize("recruiter"), getApplicantsByJob);
router.get("/user/myjobs", protect, authorize("user"), getUserApplications);
router.get(
  "/recruiter/myjobs",
  protect,
  authorize("recruiter"),
  getRecruiterApplication,
);
router.patch(
  "/:applicationId/status",
  protect,
  authorize("recruiter"),
  updateApplicationStatus,
);
router.put(
  "/:applicationId/schedule-interview",
  protect,
  authorize("recruiter"),
  scheduleInterview,
);
router.put(
  "/:applicationId/respond-interview",
  protect,
  authorize("user"),
  respondInterview,
);
router.put(
  "/:applicationId/edit-interview",
  protect,
  authorize("recruiter"),
  editInterview,
);
router.delete(
  "/:applicationId/cancel-interview",
  protect,
  authorize("recruiter"),
  cancelInterview,
);

export default router;
