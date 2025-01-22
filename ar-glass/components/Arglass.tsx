"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import jsQR from "jsqr";
import { BrowserMultiFormatReader } from "@zxing/library";
import Image from "next/image"; // Import Image from next/image
import Notification from "./Notification";
import Controlbox from "./Controlbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageBox from "./MessageBox";
import AlertBox from "./AlertBox";
import Button from "./Button";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

const Arglass = () => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const [notification, setNotification] = useState("This is a notification");
  const [alert, setAlert] = useState("This is an alert");
  const [message, setMessage] = useState("This is a message");

  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    console.log("useEffect started");
    const websocket = new WebSocket("ws://localhost:5000");
    webSocketRef.current = websocket;

    websocket.addEventListener("open", () => {
      const username = "ar-glass-1";
      const handshake = JSON.stringify({ username });
      console.log("Handshake sent:", handshake);
      webSocketRef.current?.send(handshake);
    });

    const handleIncomingMessage = (event: MessageEvent) => {
      const parsedData = JSON.parse(event.data);
      setNotification(parsedData.messageText); // Update notification
    };

    websocket.addEventListener("message", handleIncomingMessage);

    websocket.addEventListener("error", (error) => {
      console.error("WebSocket error: ", error);
    });

    websocket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    return () => {
      websocket.close();
    };
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const img = new window.Image();
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
          reader.decodeFromImageElement(img).then(
            (result) => {
              toast.success(`Barcode detected: ${result.text}`);
            },
            () => {}
          );
        }
      };
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(capture, 1000);
    return () => clearInterval(interval);
  }, [capture]);

  return (
    <div className="h-[800px] relative mx-6 bg-[url('/glass/warehouse.jpg')] bg-cover bg-center">
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
        <Button
          className="bg-blue-500"
          onClick={() => setMessage("New message")}
        >
          Message
        </Button>
        <Button
          className="bg-red-500"
          onClick={() => setAlert("New alert sent")}
        >
          Alert
        </Button>
        <Button
          className="bg-slate-100 text-black"
          onClick={() => setNotification("New notification message sent")}
        >
          Notify
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Arglass;
