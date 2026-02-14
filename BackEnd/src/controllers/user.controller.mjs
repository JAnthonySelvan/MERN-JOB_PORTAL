import cloudinary from "../config/cloudinary.mjs";
import streamifier from "streamifier";
import { User } from "../models/user.model.mjs";
import AppError from "../utils/AppError.mjs";

export const uploadUserResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError("No file uploaded", 400));
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "resumes",
          resource_type: "raw",
          format: "pdf", 
          type: "upload", 
          public_id: `${req.user._id}-${Date.now()}`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    // Delete old resume if exists
    if (user.resumePublicId) {
      await cloudinary.uploader.destroy(user.resumePublicId, {
        resource_type: "raw",
      });
    }

    user.resume = result.secure_url;
    user.resumePublicId = result.public_id;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: user.resume,
    });
  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    next(error);
  }
};
