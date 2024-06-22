import express from "express";
import { createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
const router = express.Router();
router.post("/", createPost);
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);
router.patch("/:id/like", likePost);
export default router;
