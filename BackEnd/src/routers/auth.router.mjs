import express from "express"
import { register,login,logout } from "../controllers/auth.controller.mjs"
import { registerValidator } from "../validators/auth.validator.mjs"
import validate from "../middlewares/validate.mjs"
import {protect,authorize} from "../middlewares/auth.miidleware.mjs";
import { User } from "../models/User.model.mjs";

const router = express.Router();

router.post("/register",registerValidator,validate,register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/me",protect,(req,res)=>{
        res.status(200).json({
                success : true,
                user : req.user
        })
})


// router.get("/users",protect,authorize("admin"),async(req,res)=>{
//         const users = await User.find()
//         res.status(200).send(users)
// })

export default router