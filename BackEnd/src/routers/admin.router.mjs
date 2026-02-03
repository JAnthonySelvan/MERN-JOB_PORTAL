import express from "express"
import { getAllUsers,getAllRecruiters } from "../controllers/admin.controller.mjs"
import {protect,authorize} from "../middlewares/auth.miidleware.mjs"

const router = new express.Router()

router.get("/users", protect, authorize("admin"), getAllUsers);

router.get("/recruiters", protect, authorize("admin"), getAllRecruiters);

export default router;
