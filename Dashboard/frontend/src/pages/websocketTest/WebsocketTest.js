import React, { useEffect, useRef, useState } from "react";

export const WebsocketTest = () => {
  const webSocketRef = useRef(null);
  const [textInputValue, setTextInputValue] = useState();
  const [sendNotificationAR, setsendNotificationAR] = useState();
  const [sendAlertAR, setsendAlertAR] = useState();
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

  const ARGlassNotificationCommunicate = () => {
    webSocketRef.current?.send(
      JSON.stringify({
        messageText: sendNotificationAR,
        Route: "/displayMessageInARGlass",
        target: "ar-glass-1",
        type: "notification",
      })
    );
  };

  const ARGlassAlertCommunicate = () => {
    console.log("running ARGlassAlertCommunicate");
    webSocketRef.current?.send(
      JSON.stringify({
        messageText: sendAlertAR,
        Route: "/displayMessageInARGlass",
        target: "ar-glass-1",
        type: "alert",
      })
    );
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
      <div className="flex flex-col">
        <div className="text-5xl">Send notification to ar-glass</div>
        <input
          value={sendNotificationAR}
          onChange={(e) => {
            setsendNotificationAR(e.target.value);
          }}
        ></input>
        <div
          className="bg-blue-500 w-24 rounded-xl"
          onClick={() => {
            ARGlassNotificationCommunicate();
          }}
        >
          Send
        </div>
        <div className="text-5xl">Send notification to ar-glass</div>
        <input
          value={sendAlertAR}
          onChange={(e) => {
            setsendAlertAR(e.target.value);
          }}
        ></input>
        <div
          className="bg-red-500 w-24 rounded-xl"
          onClick={() => {
            ARGlassAlertCommunicate();
          }}
        >
          Send
        </div>
      </div>
    </>
  );
};
