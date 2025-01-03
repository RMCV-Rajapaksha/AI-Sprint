import Image from "next/image";
import React from "react";

const Controlbox = () => {
  return (
    <div className="absolute top-24 left-0 text-white w-full px-44">
      <div className="px-10 py-1 border-white border-[1px] rounded-xl flex justify-between items-center">
        <div className="flex-1 flex gap-5">
          <Image
            src={"/icons/battery.svg"}
            width={20}
            height={20}
            alt="battery"
          />
          <Image src={"/icons/wifi.svg"} width={20} height={20} alt="wifi" />
        </div>
        <div className="flex-1 flex gap-5 justify-end">
          <Image src={"/icons/home.svg"} width={20} height={20} alt="home" />
          <Image
            src={"/icons/message2.svg"}
            width={20}
            height={20}
            alt="message"
          />
          <Image
            src={"/icons/notification2.svg"}
            width={20}
            height={20}
            alt="notification"
          />
        </div>
      </div>
    </div>
  );
};

export default Controlbox;
