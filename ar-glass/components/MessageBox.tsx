"use client";
import React, { ReactNode, useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";

const MessageBox = ({ messages }: { messages: any }) => {
  const [toDisplay, setToDisplay] = useState<ReactNode[]>();
  useEffect(() => {
    console.log("use effect fired");
    loadMessages();
  }, [messages]);
  const loadMessages = () => {
    const components: ReactNode[] = [];
    messages.forEach((element, index) => {
      components.push(
        <MessageBubble key={index} message={element} type="system" />
      );
    });
    setToDisplay(components);
  };
  return (
    <div className="absolute bottom-5 left-5">
      <div className="backdrop-blur-sm border border-slate-400 w-[500px] h-[250px] px-5 py-3 flex flex-col justify-between gap-1 rounded-2xl">
        <div className="flex-1 inline-flex flex-col gap-4 relative w-full h-full overflow-y-auto custom-scrollbar">
          {messages.map((message, i) => (
            <MessageBubble key={i} message={message} type="system" />
          ))}
          {/* {toDisplay} */}
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
