import User from "../../models/user.js";
import Channel from "../../models/channel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.exists({ email });
    if (userExists) {
      return res.status(409).send("Email already in use");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newChannel = await Channel.create({});
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
      channel: newChannel._id,
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "8h",
      }
    );

    return res.status(201).json({
      userDetails: {
        email: user.email,
        username,
        token,
      },
    });
  } catch (err) {
    return res.status(500).send("Error occured. Please try again");
  }
};
