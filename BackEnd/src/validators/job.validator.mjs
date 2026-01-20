import {body} from "express-validator"

export const jobValidator = [
  body("title")
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ min: 3 })
    .withMessage("Job title must be at least 3 characters"),

  body("description")
    .notEmpty()
    .withMessage("Job description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("location").notEmpty().withMessage("Job location is required"),

  body("salary").optional().isNumeric().withMessage("Salary must be a number"),

  body("jobType")
    .optional()
    .isIn(["full-time", "part-time", "internship", "contract"])
    .withMessage("Invalid job type"),
];