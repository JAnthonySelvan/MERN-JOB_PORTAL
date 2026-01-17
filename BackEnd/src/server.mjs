import app from "./app.mjs";
import connectDB from "./config/db.mjs";

import dotenv from "dotenv"
dotenv.config()


const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})