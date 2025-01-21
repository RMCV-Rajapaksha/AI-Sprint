import React from "react";

const Button = ({
  children,
  onClick,
  className,
}: {
  children: any;
  onClick: any;
  className?: string;
}) => {
  return (
    <div>
      <button
        className={`bg-black rounded-3xl text-white px-5 py-2 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
