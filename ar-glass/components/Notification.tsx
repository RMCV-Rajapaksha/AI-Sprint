"use client";
import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";
import { useRef } from "react";

const Notification = ({
  notificationMessage,
  className,
}: {
  notificationMessage: string;
  className?: String;
}) => {
  const notificationRef = useRef(null);
  const textRef = useRef(null);
  useGSAP(() => {
    gsap.from(notificationRef.current, {
      x: -500,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from(textRef.current, { opacity: 0, delay: 1 });
  }, [notificationMessage]);
  return (
    <div
      ref={notificationRef}
      className={`w-[400px] h-[200px] bg-white bg-opacity-65 absolute top-1/3 left-5 rounded-3xl flex items-center justify-center font-bold backdrop-blur-sm border border-white origin-center ${className}`}
    >
      <div ref={textRef} className="max-w-[80%] mx-auto p-5">
        {notificationMessage}
      </div>
    </div>
  );
};

export default Notification;
