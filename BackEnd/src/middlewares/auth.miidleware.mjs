import jwt from "jsonwebtoken"
import { User } from "../models/User.model.mjs"
import AppError from "../utils/AppError.mjs";

export const protect = async(req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
      return next(
            new AppError("No Authorized,No Token!")
        )
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId).select("-password")
        if (!req.user) {
          return next(new AppError("User not found", 401));
        }
        return next()
    }
    catch(err){
        return next(new AppError("Not authorized, token failed",401));
    }
}

export const authorize = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new AppError("You don't have permission to perform this action!",403)
            )
        }
        next()
    }
}