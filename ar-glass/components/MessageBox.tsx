import React from "react";
import MessageBubble from "./MessageBubble";

const MessageBox = () => {
  return (
    <div className="absolute bottom-5 left-5">
      <div className="bg-slate-700 w-[500px] h-[200px] px-3 py-3 flex flex-col justify-between gap-1 rounded-2xl">
        <div className="flex-1 relative w-full h-full overflow-y-auto">
          <MessageBubble type="worker" />
          <MessageBubble type="system" />
        </div>
        <input
          type="text"
          className="rounded-2xl w-full h-10 px-2 py-2 outline-none"
        />
      </div>
    </div>
  );
};

export default MessageBox;
