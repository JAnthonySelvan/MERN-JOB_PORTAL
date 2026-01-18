import {body} from "express-validator"

export const registerValidator = [
  body("name").notEmpty().withMessage("Name is Required!"),
  body("email").isEmail().withMessage("Valid email REquired!"),
  body("password").isLength({ min: 6 }).withMessage("Password at least contain 6 letters"),
  body("role").optional().isIn(["user","recruiter"]).withMessage("Invalid Role!")
];

