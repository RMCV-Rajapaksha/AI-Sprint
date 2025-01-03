import React from "react";
import Image from "next/image";
import Message from "./Message";
import Controlbox from "./Controlbox";

const messageContent =
  " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, optio.";

const Arglass = () => {
  return (
    <div className="h-[800px] mx-6 py-10 bg-[url('/glass/warehouse.jpg')] bg-cover bg-center">
      <div className="h-full bg-black w-full eye-glass relative">
        <div className="absolute right-36 bottom-32">
          <Image
            src={"/glass/map.png"}
            width={300}
            height={300}
            alt="map"
          ></Image>
        </div>

        <Message message={messageContent} />
        <Controlbox />
      </div>
    </div>
  );
};

export default Arglass;
