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
      className={`w-[400px] h-[200px] bg-white absolute top-1/2 left-1/2 message  flex items-center justify-center font-bold translate-x-[-50%] translate-y-[-50%] ${className}`}
    >
      <div className="max-w-[80%] mx-auto p-5">{message}</div>
    </div>
  );
};

export default Message;
