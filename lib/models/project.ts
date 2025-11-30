import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDesc: { type: String, required: true },
  details: { type: String },
  tech: [{ type: String }],
  screenshots: [{ type: String }],
  liveUrl: { type: String },
  repoUrl: { type: String },
  featured: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default models.Project || model("Project", ProjectSchema);