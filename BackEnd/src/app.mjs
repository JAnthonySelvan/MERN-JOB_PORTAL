import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "../src/routers/auth.router.mjs"
import jobRoutes from "../src/routers/job.router.mjs"
import applicationRoutes from "../src/routers/application.router.mjs"
import errorMiddleware from "../src/middlewares/error.middleware.mjs"


const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/",(req,res)=>{
    res.send("Job Portal BackEnd Home")
})
app.use("/api/auth",authRoutes)
app.use("/api",jobRoutes)
app.use("/api/application",applicationRoutes)
app.use(errorMiddleware)


export default app;