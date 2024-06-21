import mongoose from "mongoose";
const postSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    longtitude: Number,
    latitude: Number,
    description: String,
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' }, 
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
