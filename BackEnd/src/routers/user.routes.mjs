import { uploadUserResume } from "../controllers/user.controller.mjs";
import { uploadResume } from "../middlewares/upload.mjs";
import express from "express"
import { protect } from "../middlewares/auth.miidleware.mjs";

const router = express.Router()

router.patch("/upload-resume",protect,uploadResume.single("resume"),uploadUserResume)

export default router