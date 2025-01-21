"use client";

import React, { useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import jsQR from "jsqr";
import { BrowserMultiFormatReader } from "@zxing/library";
import Image from "next/image"; // Import Image from next/image
import Message from "./Message";
import Controlbox from "./Controlbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageBox from "./MessageBox";
import AlertBox from "./AlertBox";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

const messageContent =
  " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, optio.";

const Arglass = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const img = new window.Image(); // Use native Image constructor
      img.src = imageSrc;
      img.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          toast.success(`QR Code detected: ${code.data}`);
        } else {
          const reader = new BrowserMultiFormatReader();
          reader
            .decodeFromImageElement(img)
            .then((result) => {
              toast.success(`Barcode detected: ${result.text}`);
            })
            .catch((err) => {});
        }
      };
    }
  }, [webcamRef, canvasRef]);

  useEffect(() => {
    const interval = setInterval(capture, 1000);
    return () => clearInterval(interval);
  }, [capture]);

  return (
    <div className="h-[800px] relative mx-6  bg-[url('/glass/warehouse.jpg')] bg-cover bg-center ">
      <div className="relative w-full h-full">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="absolute object-cover w-full h-full"
        />
        <canvas ref={canvasRef} className="hidden" />
        <div className="absolute right-5 bottom-5">
          <Image src={"/glass/map.png"} width={300} height={300} alt="map" />
        </div>

        <Message message={messageContent} />
        <Controlbox />
        <MessageBox />
      </div>
      <AlertBox alert="This is an alert" />
      <ToastContainer />
    </div>
  );
};

export default Arglass;
