import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { _id, name, email, imageId, friends, hotels, phone, userType, longtitude, latitude } = user;
    res.status(200).json({
      _id,
      name,
      email,
      imageId,
      friends,
      hotels,
      phone,
      userType,
      longtitude,
      latitude,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('friends', ' _id name email imageId friends hotels phone userType longtitude latitude ');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const formattedFriends = user.friends.map(({ _id, name, email, imageId, friends, hotels, phone, userType, longtitude, latitude }) => {
      return { _id, name, email, imageId, friends, hotels, phone, userType, longtitude, latitude };
    });
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const addRemoveFriend = async (req, res) => {
  try {
    const { friendId } = req.params;
    const user = await User.findOne();
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: "User or Friend not found" });
    }

    if (user.friends.includes(friendId)) {
      user.friends.pull(friendId);
      friend.friends.pull(user._id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(user._id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, name, email, imageId, friends, hotels, phone, userType, longtitude, latitude }) => {
        return { _id, name, email, imageId, friends, hotels, phone, userType, longtitude, latitude };
      }
    );
    res.status(200).json(formattedFriends);
    } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getOtherUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { _id, name, email, imageId, friends, hotels, phone, userType, longtitude, latitude } = user;
    res.status(200).json({
      _id,
      name,
      email,
      imageId,
      friends,
      hotels,
      phone,
      userType,
      longtitude,
      latitude,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};