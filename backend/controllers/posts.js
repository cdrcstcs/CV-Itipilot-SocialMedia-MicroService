import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  const { description, longtitude, latitude, imageId } = req.body;
  const user = (await User.findOne());
  try {
    if (!description) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new Post({
      userId: user._id,
      description,
      longtitude,
      latitude,
      imageId,
      userPicturePath: user.picturePath,
      likes: new Map(),
    });
    await newPost.save();
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all posts where userId matches
    const posts = await Post.find({ userId: userId });

    // Return the posts as JSON response
    res.status(200).json(posts);
  } catch (err) {
    // Handle errors
    res.status(404).json({ message: err.message });
  }
};
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    // const { userId } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const user = await User.findOne()
    const isLiked = post.likes.get(user._id);
    if (isLiked) {
      post.likes.delete(user._id);
    } else {
      post.likes.set(user._id, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
