import mongoose from "mongoose";

const speakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true }, // store image URL
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Speaker", speakerSchema);
