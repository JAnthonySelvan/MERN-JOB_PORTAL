import { User } from "../models/user.model.mjs";

export const uploadUserResume = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    user.resume = `/uploads/resumes/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: user.resume,
    });
  } catch (error) {
    console.log("Error")
    next(error);
  }
};
