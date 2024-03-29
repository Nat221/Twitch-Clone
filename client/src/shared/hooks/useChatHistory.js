import { useEffect, useState } from "react";
import { useStore } from "../../store/store.js";
import { getChatHistory } from "../../socketConn";
import { sendChatMessage } from "../../socketConn";
import { useUserDetails } from "./useUserDetails";
import { closeChatSubscription } from "../../socketConn/socketConn";

export const useChatHistory = (channelId) => {
  const { chatHistory } = useStore();
  const { isLogged, username } = useUserDetails();

  useEffect(() => {
    getChatHistory(channelId);

    return () => {
      closeChatSubscription(channelId);
    };
  }, []);

  const sendMessage = (message) => {
    sendChatMessage(channelId, {
      author: isLogged ? username : "Guest",
      content: message,
    });
  };

  return {
    messages: chatHistory?.channelId === channelId ? chatHistory.messages : [],
    sendMessage,
  };
};
