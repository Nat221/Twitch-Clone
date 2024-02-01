import express from "express";
import {
  getChannelDetails,
  getChannels,
  postFollowChannel,
  getFollowedChannels,
} from "../controllers/controllers.js";

import Joi from "joi";
import ExpressValidation from "express-joi-validation";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();
const channelDetailsSchema = Joi.object({
  channelId: Joi.string().required(),
});

const validator = ExpressValidation.createValidator({});

router.get("/followed", verifyToken, getFollowedChannels);

router.post(
  "/follow",
  verifyToken,
  validator.body(channelDetailsSchema),
  postFollowChannel
);

router.get(
  "/:channelId",
  validator.params(channelDetailsSchema),
  getChannelDetails
);

router.get("/", getChannels);

export default router;
