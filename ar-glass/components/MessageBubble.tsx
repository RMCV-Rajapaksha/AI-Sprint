import React from "react";

const MessageBubble = ({
  type,
  message,
}: {
  type: string;
  message: string;
}) => {
  if (type === "worker") {
    return (
      <div className=" bg-slate-500 absolute right-0 inline-flex px-5 text-white rounded-3xl mt-6">
        Message from worker
      </div>
    );
  } else if (type === "system") {
    return (
      <div className=" inline-flex px-5 py-1 bg-blue-600 text-white rounded-3xl w-4/5">
        {message}
      </div>
    );
  }
};

export default MessageBubble;
