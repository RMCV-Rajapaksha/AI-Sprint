import React from "react";
import MessageBubble from "./MessageBubble";

const messages = [
  "System message 1",
  "System message 2",
  "System message 3",
  "System message 4",
  "System message 5",
  "System message 6",
  "System message 7",
];

const MessageBox = () => {
  return (
    <div className="absolute bottom-5 left-5">
      <div className="backdrop-blur-sm border border-slate-400 w-[500px] h-[250px] px-5 py-3 flex flex-col justify-between gap-1 rounded-2xl">
        <div className="flex-1 inline-flex flex-col gap-4 relative w-full h-full overflow-y-auto custom-scrollbar">
          {messages.map((message, i) => (
            <MessageBubble key={i} message={message} type="system" />
          ))}
        </div>
        {/* <input
          type="text"
          className="rounded-2xl w-full h-10 px-2 py-2 outline-none"
        /> */}
      </div>
    </div>
  );
};

export default MessageBox;
