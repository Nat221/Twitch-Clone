import User from "../../models/user.js";
export const getFollowedChannels = async (req, res) => {
  try {
    const { userId } = req.user;
    const { followedChannels } = await User.findById(userId, {
      followedChannels: 1,
    });

    return res.status(200).json({ followedChannels });
  } catch (err) {
    res.status(500).send("Error occured when fetching followed channels.");
  }
};
