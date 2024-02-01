import { toast } from "react-hot-toast";
import { followChannel as followChannelRequest } from "../../api";

export const useFollowChannel = () => {
  const followChannel = async (channelId, getChannels) => {
    const responseData = await followChannelRequest(channelId);
    if (responseData.error) {
      return toast.error(
        responseData.exception?.response?.data ||
          "Error occured when trying to follow a channel."
      );
    }

    toast.success("Channel followed succesfully");
    getChannels(true);
  };

  return { followChannel };
};
