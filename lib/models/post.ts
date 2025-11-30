import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  tags: [{ type: String }],
  publishedAt: { type: Date, default: Date.now },
});

export default models.Post || model("Post", PostSchema);