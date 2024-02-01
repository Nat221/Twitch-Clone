import Channel from "../../models/channel.js";
import Message from "../../models/message.js";

export const emitChatHistory = async (socket, channelId) => {
  try {
    const channel = await Channel.findById(channelId).populate("messages");

    if (channel) {
      return socket.emit("chat-history", {
        channelId,
        messages: channel.messages.map((m) => ({
          author: m.author,
          content: m.content,
          date: m.date,
        })),
      });
    }

    console.log(`No channel : ${channel} ${channelId}`);

    socket.emit("chat-history", {
      errorOccured: true,
    });
  } catch (err) {
    socket.emit("chat-history", {
      errorOccured: true,
      err,
    });
  }
};

export const emitChatMessage = async (io, messageData) => {
  try {
    const channel = await Channel.findById(messageData.toChannel);

    if (channel) {
      const newMessage = new Message({
        content: messageData.message.content,
        author: messageData.message.author,
        date: new Date(),
      });

      await newMessage.save();

      channel.messages.push(newMessage._id);

      await channel.save();

      io.to(messageData.toChannel).emit("chat-message", newMessage);
    }
  } catch (err) {
    console.log(err);
  }
};
