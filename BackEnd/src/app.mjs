import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "../src/routers/auth.router.mjs"
import errorMiddleware from "../src/middlewares/error.middleware.mjs"


const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.get("/",(req,res)=>{
    res.send("Job Portal BackEnd Home")
})
app.use("/api/auth",authRoutes)

app.use(errorMiddleware)


export default app;