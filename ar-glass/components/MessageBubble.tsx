import React from "react";

const MessageBubble = ({ type }: { type: string }) => {
  if (type === "worker") {
    return (
      <div className=" bg-slate-500 absolute right-0 inline-flex px-5 text-white rounded-3xl">
        Message from worker
      </div>
    );
  } else if (type === "system") {
    return (
      <div className=" inline-flex px-5 bg-blue-600 text-white rounded-3xl">
        Message from system
      </div>
    );
  }
};

export default MessageBubble;
