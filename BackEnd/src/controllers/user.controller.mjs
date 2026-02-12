import { User } from "../models/user.model.mjs";
import AppError from "../utils/AppError.mjs";
import cloudinary from "../config/cloudinary.mjs";
import streamifier from 'streamifier'

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
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    if (user.resumePublicId) {
      await cloudinary.uploader.destroy(user.resumePublicId);
    }

    user.resume = result.secure_url;
    user.resumePublicId = result.public_id;
    await user.save();

    return res.status(200).json({
      success: true,
      resume: user.resume,
    });
  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
