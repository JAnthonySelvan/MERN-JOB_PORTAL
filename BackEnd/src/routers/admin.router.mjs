import express from "express";
import {
  getAllUsers,
  getAllRecruiters,
  updateRecruiterStatus,
  getAdminAnalytics,
} from "../controllers/admin.controller.mjs";
import { protect, authorize } from "../middlewares/auth.miidleware.mjs";

const router = new express.Router();

router.get("/users", protect, authorize("admin"), getAllUsers);

router.get("/recruiters", protect, authorize("admin"), getAllRecruiters);
router.put(
  "/recruiters/:id/status",
  protect,
  authorize("admin"),
  updateRecruiterStatus,
);

router.get("/analytics", protect, authorize("admin"), getAdminAnalytics);

export default router;
