import mongoose, { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true }, // e.g. "2023 - Present"
  desc: { type: String, required: true },
  stack: [{ type: String }],
  order: { type: Number, default: 0 } // For sorting
});

export default models.Experience || model("Experience", ExperienceSchema);