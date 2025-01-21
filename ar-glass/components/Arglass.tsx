"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Message from "./Message";
import Controlbox from "./Controlbox";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

const messageContent =
  " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, optio.";

const Arglass = () => {
  return (
    <div className="h-[800px] mx-6 py-10 bg-[url('/glass/warehouse.jpg')] bg-cover bg-center">
      <div className="relative w-full h-full">
        <Webcam
          audio={false}
          className="absolute object-cover w-full h-full"
        />
        <div className="absolute right-36 bottom-32">
          <Image
            src={"/glass/map.png"}
            width={300}
            height={300}
            alt="map"
          />
        </div>

        <Message message={messageContent} />
        <Controlbox />
      </div>
    </div>
  );
};

export default Arglass;