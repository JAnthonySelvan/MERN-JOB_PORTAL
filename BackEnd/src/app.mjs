import express from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import authRoutes from "../src/routers/auth.router.mjs"
import jobRoutes from "../src/routers/job.router.mjs"
import applicationRoutes from "../src/routers/application.router.mjs"
import errorMiddleware from "../src/middlewares/error.middleware.mjs"
import userRouter from "../src/routers/user.routes.mjs"
import adminRoutes from "../src/routers/admin.router.mjs"
// import dotenv from "dotenv"
// dotenv.config()

// import mongoose from "mongoose";

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log(err));



const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(helmet({crossOriginResourcePolicy:false}))
// app.use("/uploads", express.static("uploads"));


app.get("/",(req,res)=>{
    res.send("Job Portal BackEnd Home")
})
app.use("/api/auth",authRoutes)
app.use("/api",jobRoutes)
app.use("/api/application",applicationRoutes)
app.use("/api/user",userRouter)
app.use("/api/admin",adminRoutes)
app.use(errorMiddleware)


export default app;