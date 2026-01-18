import express from "express"
import { register,login } from "../controllers/auth.controller.mjs"
import { registerValidator } from "../validators/auth.validator.mjs"
import validate from "../middlewares/validate.mjs"

const router = express.Router();

router.post("/register",registerValidator,validate,register)
router.post("/login",login)

export default router