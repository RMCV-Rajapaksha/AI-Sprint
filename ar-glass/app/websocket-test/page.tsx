"use client";
import React, { useEffect, useRef, useState } from "react";

const page = () => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const [textInputValue, setTextInputValue] = useState<any>();
  useEffect(() => {
    console.log("use effect started");
    const websocket = new WebSocket("ws://localhost:5000");
    webSocketRef.current = websocket;

    webSocketRef.current.addEventListener("open", (event) => {
      const username = getCurrentUsername();
      const handshake = JSON.stringify({ username });
      console.log("handshake to be sent", handshake);
      webSocketRef.current?.send(handshake);
      console.log(`Handshake sent as ${username}`);
    });

    const messageListenerFunction = (event: any) => {
      const parsedData = JSON.parse(event.data);
      console.log("Message from server ", parsedData.messageText);
      websocket.removeEventListener("message", messageListenerFunction);
    };

    webSocketRef.current.addEventListener("message", messageListenerFunction);

    websocket.addEventListener("error", (error) => {
      console.error("WebSocket error: ", error);
    });

    websocket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });
  }, []);
  const getCurrentUsername = () => {
    return "ar-glass-1";
  };

  const SendMessage = () => {
    webSocketRef.current?.send(
      JSON.stringify({
        messageText: textInputValue,
        Route: "/echoBackMyMessage",
      })
    );

    const messageListenerFunction = (event: any) => {
      const parsedData = JSON.parse(event.data);
      console.log("Message from server ", parsedData.messageText);
      webSocketRef.current?.removeEventListener(
        "message",
        messageListenerFunction
      );
    };

    webSocketRef.current?.addEventListener("message", messageListenerFunction);
  };

  return (
    <>
      <div>Websocket-test</div>;
      <input
        value={textInputValue}
        onChange={(e) => {
          setTextInputValue(e.target.value);
        }}
      ></input>
      <div
        className="bg-green-500 w-24 rounded-xl"
        onClick={() => {
          SendMessage();
        }}
      >
        Send
      </div>
    </>
  );
};

export default page;
