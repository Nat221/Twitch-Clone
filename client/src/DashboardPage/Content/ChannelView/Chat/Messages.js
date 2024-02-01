import React from "react";

const Message = ({ author, content }) => {
  return (
    <span className="chat-messages-message">
      <span style={{ fontWeight: "bold" }}>{author}:</span>
      {content}
    </span>
  );
};

export const Messages = ({ messages }) => {
  return (
    <div className="chat-messages-container">
      {messages.map((m) => {
        return (
          <Message
            author={m.author}
            content={m.content}
            key={`${m.author}-${m.content}-${m.date}`}
          />
        );
      })}
    </div>
  );
};
