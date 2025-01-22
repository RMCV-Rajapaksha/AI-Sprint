"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import jsQR from "jsqr";
import { BrowserMultiFormatReader } from "@zxing/library";
import Image from "next/image"; // Import Image from next/image
import Message from "./Notification";
import Controlbox from "./Controlbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageBox from "./MessageBox";
import AlertBox from "./AlertBox";
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Notification from "./Notification";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

// const notificationMessage = "This is a notification";

// const alert = "This is an alert";

// const message = "This is a message";

const Arglass = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [notification, setNotification] = useState("This is a notification");
  // const [notificationMessage, setNotificationMessage] = useState("");
  const [alert, setAlert] = useState("This is a message");
  // const [alertMessage, setAlertMessage] = useState("");
  const [message, setMessage] = useState("This is a message");
  // const [messageText, setMessageText] = useState("");

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
          console.log(typeof code.data);
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

  const sendMessage = (message: string) => {};
  const sendAlert = (alert: string) => {
    setAlert(alert);
  };
  const sendNotification = (notification: string) => {
    setNotification(notification);
  };

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

        <Notification notificationMessage={notification} />
        <Controlbox />
        <MessageBox />
      </div>
      <AlertBox alert={alert} />
      <div className="absolute bottom-5 left-1/2 translate-x-[-50%] flex gap-3">
        <Button className="bg-blue-500" onClick={() => sendMessage(message)}>
          Message
        </Button>
        <Button
          className="bg-red-500"
          onClick={() => sendAlert("New alert sent")}
        >
          Alert
        </Button>
        <Button
          className="bg-slate-100 text-black"
          onClick={() => sendNotification("New notification message sent")}
        >
          Notify
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Arglass;
