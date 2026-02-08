import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected"],
      default: "applied",
    },
    jobDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true },
);
const interviewSchema = new mongoose.Schema({
  mode: {
    type: String,
    enum: ["online", "offline"],
  },
  date: Date,
  time: String,
  link: String, 
  location: String, 
  status: {
    type: String,
    enum: ["scheduled", "accepted", "rejected"],
    default: "scheduled",
  },
});

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });
applicationSchema.add({interview:interviewSchema})

export const Application = mongoose.model("Application",applicationSchema)
