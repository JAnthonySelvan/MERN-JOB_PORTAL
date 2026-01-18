import { validationResult } from "express-validator";
import AppError from "../utils/AppError.mjs";

const validate = (req, res, next) => {
console.log("validate typeof next:", typeof next);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new AppError(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400,
      ),
    );
  }

  return next();
};

export default validate;
