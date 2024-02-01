import React from "react";
import { useUserDetails, useFollowChannel } from "../../../shared/hooks";

const FollowButton = ({ channelId, getChannels }) => {
  const { followChannel } = useFollowChannel();

  const handleFollowChannel = async () => {
    await followChannel(channelId, getChannels);
  };
  return (
    <button className="channel-follow-button" onClick={handleFollowChannel}>
      Follow
    </button>
  );
};

export const ChannelDescription = ({
  username,
  title,
  description,
  channelId,
  getChannels,
}) => {
  const { isLogged } = useUserDetails();
  return (
    <div className="channel-description-container">
      <span className="channel-description-title">
        {username}
        <span>
          {isLogged && (
            <FollowButton channelId={channelId} getChannels={getChannels} />
          )}
        </span>
      </span>
      <span className="channel-description-subtitle">{title}</span>
      <div className="channel-description-box">
        <span className="channel-description">{description}</span>
      </div>
    </div>
  );
};
