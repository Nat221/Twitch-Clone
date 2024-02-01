import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user && bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "8h",
        }
      );
      return res.status(200).json({
        userDetails: {
          email: user.email,
          token,
          username: user.username,
        },
      });
    }

    return res.status(400).send("Invalid credentials.Please try again");
  } catch (err) {
    return res.status(500).send("Something went wrong.Please try again.");
  }
};
