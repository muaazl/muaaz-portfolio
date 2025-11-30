import { Schema, model, models } from "mongoose";

const BucketSchema = new Schema({
  title: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["not-started", "in-progress", "done"], 
    default: "not-started" 
  },
  category: { type: String }, // e.g., "Life", "Dev", "Fitness"
});

export default models.Bucket || model("Bucket", BucketSchema);