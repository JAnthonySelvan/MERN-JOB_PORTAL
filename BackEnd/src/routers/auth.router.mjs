import express from "express"
import { register,login,logout } from "../controllers/auth.controller.mjs"
import { registerValidator } from "../validators/auth.validator.mjs"
import validate from "../middlewares/validate.mjs"
import protect from "../middlewares/auth.miidleware.mjs";

const router = express.Router();

router.post("/register",registerValidator,validate,register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/profile",protect,(req,res)=>{
        res.status(200).json(req.user)
})

export default router