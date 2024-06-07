import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  // try {
  //   const { userId, description, picturePath } = req.body;
    
  //   // Check if the required fields are present
  //   if (!userId || !description) {
  //     return res.status(400).json({ message: "Missing required fields" });
  //   }

  //   // Check if the user exists
  //   const user = await User.findById(userId);
  //   if (!user) {
  //     return res.status(404).json({ message: "User not found" });
  //   }

  //   // Create a new post
  //   const newPost = new Post({
  //     userId,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     location: user.location,
  //     description,
  //     userPicturePath: user.picturePath,
  //     picturePath,
  //     likes: {},
  //     comments: [],
  //   });
  //   await newPost.save();

  //   // Retrieve and send back all posts after creating the new post
  //   const posts = await Post.find();
  //   res.status(200).json(posts);
  // } catch (err) {
  //   // Handle any errors
  //   res.status(500).json({ message: err.message });
  // }
  const { userId, description, picturePath } = req.body;
    
    // Check if the required fields are present
    if (!userId || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new post
    const newPost = new Post({
      userId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    // Retrieve and send back all posts after creating the new post
    const posts = await Post.find();
    res.status(200).json(posts);
};


/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
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
