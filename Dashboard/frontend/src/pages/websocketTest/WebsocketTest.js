import React, { useEffect, useRef, useState } from "react";

export const WebsocketTest = () => {
  const webSocketRef = useRef(null);
  const [textInputValue, setTextInputValue] = useState();
  useEffect(() => {
    console.log("use effect started");
    const websocket = new WebSocket("ws://localhost:5000");
    webSocketRef.current = websocket;
  }, []);
  useEffect(() => {
    webSocketRef.current.addEventListener("open", (event) => {
      const username = getCurrentUsername();
      const handshake = JSON.stringify({ username });
      console.log("handshake to be sent", handshake);
      if (webSocketRef.current.readyState == WebSocket.OPEN) {
        webSocketRef.current.send(handshake);
      }
      console.log(`Handshake sent as ${username}`);
    });

    const messageListenerFunction = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log("Message from server ", parsedData.messageText);
      webSocketRef.current.removeEventListener(
        "message",
        messageListenerFunction
      );
    };

    webSocketRef.current.addEventListener("message", messageListenerFunction);

    webSocketRef.current.addEventListener("error", (error) => {
      console.error("WebSocket error: ", error);
    });

    webSocketRef.current.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });
  }, [webSocketRef]);
  const getCurrentUsername = () => {
    return "dashboard-1";
  };

  const SendMessage = () => {
    webSocketRef.current?.send(
      JSON.stringify({
        messageText: textInputValue,
        Route: "/echoBackMyMessage",
      })
    );

    const messageListenerFunction = (event) => {
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
