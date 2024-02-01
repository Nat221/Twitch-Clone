import React from "react";
import { StreamKey } from "./StreamKey.js";
import { ChannelSettings } from "./ChannelSettings.js";
import { PasswordSettings } from "./PasswordSettings.js";
import { useChannelSettings } from "../../../shared/hooks/useChannelSettings.js";
import { LoadingSpinner } from "../../../shared/components";

// const channelSettings = {
//   title: "title",
//   description: "description",
//   avatarUrl: "none",
//   username: "Martin",
//   streamKey: "1234",
// };

export const Settings = () => {
  const { channelSettings, isFetching, saveSettings } = useChannelSettings();

  if (isFetching) {
    return <LoadingSpinner />;
  }
  return (
    <div className="settings-container">
      <span>Settings</span>
      <ChannelSettings settings={channelSettings} saveSettings={saveSettings} />
      <PasswordSettings />
      <StreamKey streamKey={channelSettings.streamKey} />
    </div>
  );
};
