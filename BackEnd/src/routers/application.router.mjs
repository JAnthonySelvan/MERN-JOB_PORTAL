import { applyJob } from "../controllers/application.controller.mjs";
import express from "express"
import {protect,authorize} from "../middlewares/auth.miidleware.mjs"

const router = express.Router()

router.post("/:jobId",protect,authorize("user"),applyJob)

export default router