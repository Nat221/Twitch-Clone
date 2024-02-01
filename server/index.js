import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Message from "./src/models/message.js";
import User from "./src/models/user.js";
import Channel from "./src/models/channel.js";

import authRoutes from "./src/routes/authRoutes.js";
import channelRoutes from "./src/routes/channelRoutes.js";
import settingsRoutes from "./src/routes/settingsRoutes.js";
import { registerSocketServer } from "./src/io/io.js";

dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  return res.send("Hello from the server");
});

app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/settings", settingsRoutes);

const server = http.createServer(app);

registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed. Server not started.");
    console.log(err);
  });
