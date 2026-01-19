import bcrypt from "bcryptjs";
import { User } from "../models/User.model.mjs";
import generateToken from "../utils/generateToken.mjs";
import AppError from "../utils/AppError.mjs";


export const register = async(req,res,next)=>{
    // console.log("validate typeof next:", typeof next);
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new AppError("Email already Rigisterd!", 400));
  }

  await User.create({ name, email, password, role });

  res.status(201).json({
    success: true,
    messsage:
      role === "recruiter"
        ? "Recruiter Registerd waiting for Admin approval"
        : "User Registerd successfully",
  });
}

export const login = async(req,res,next)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password")

    if(!user){
       return next(
            new AppError("Invalid Credentials!",401)
        )
    }
    if(!user.isActive){
      return next(
            new AppError("User in Inactive",403)
        )
    }
    if(user.role ==="recruiter" && !user.isApproved){
       return next(
            new AppError("Recruiter yet not approved!",403)
        )
    }

    const isMatched = await bcrypt.compare(password,user.password)

    if(!isMatched){
      return  next(
            new AppError("Invalid Credentials",401)
        )
    }

    generateToken(res,user._id)

    res.status(200).json(
        {
            success : true,
            messsage : "Login Successful",
            user :{
                name : user.name,
                email : user.email,
                role : user.role
            }
        }
    )

}

export const logout = (req,res,next) =>{
    res.cookie("token","",{
        httpOnly : true,
        expires : new Date(0)
    })

      res.status(200).json({ message: "Logged out successfully" });

}