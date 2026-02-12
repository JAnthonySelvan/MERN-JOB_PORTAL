import dotenv from "dotenv";
dotenv.config();
import app from "./app.mjs";
import connectDB from "./config/db.mjs";
import cloudinary from "./config/cloudinary.mjs";

const PORT = process.env.PORT || 5000;

connectDB();

// console.log(cloudinary.config());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
