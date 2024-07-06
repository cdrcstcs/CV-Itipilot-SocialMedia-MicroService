import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getOtherUser
} from "../controllers/users.js";
const router = express.Router();
router.get("", getUser);
router.get("/others/:id", getOtherUser);
router.get("/:id/friends", getUserFriends);
router.patch("/:friendId", addRemoveFriend);
export default router;
