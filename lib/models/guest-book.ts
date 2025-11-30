import { Schema, model, models } from "mongoose";

const GuestbookSchema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Guestbook || model("Guestbook", GuestbookSchema);