import React from "react";

const Message = ({
  message,
  className,
}: {
  message: string;
  className?: String;
}) => {
  return (
    <div
      className={`w-[400px] h-[200px] bg-white bg-opacity-65 absolute top-1/3 left-5 rounded-3xl   flex items-center justify-center font-bold  translate-y-[-50%] backdrop-blur-sm border border-white ${className}`}
    >
      <div className="max-w-[80%] mx-auto p-5">{message}</div>
    </div>
  );
};

export default Message;
