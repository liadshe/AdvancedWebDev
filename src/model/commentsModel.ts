import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
});
export default mongoose.model("comment", commentSchema);