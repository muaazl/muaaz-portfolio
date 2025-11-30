import mongoose, { Schema, model, models } from "mongoose";

const SkillSchema = new Schema({
  name: { type: String, required: true },
  percent: { type: Number, required: true },
  category: { type: String, default: "Tech" }
});

export default models.Skill || model("Skill", SkillSchema);