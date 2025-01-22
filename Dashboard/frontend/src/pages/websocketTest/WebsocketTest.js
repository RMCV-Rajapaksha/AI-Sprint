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
        Route: "/displayMessageInARGlass",
        target: "ar-glass-1",
        type: "message",
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
    <div className="min-h-screen p-4 bg-gray-100 md:p-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800 md:text-4xl">
          Notify Warehouse
        </h1>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Echo Message Card */}
          <div className="p-6 transition-transform bg-white rounded-lg shadow-lg hover:scale-102">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              Echo Message
            </h2>
            <input
              value={textInputValue}
              onChange={(e) => setTextInputValue(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button
              onClick={SendMessage}
              className="flex items-center justify-center px-6 py-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
            >
              Send Message
            </button>
          </div>

          {/* AR Glass Communications */}
          <div className="space-y-8">
            {/* Notification Card */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                Send Notification to AR Glass
              </h2>
              <input
                value={sendNotificationAR}
                onChange={(e) => setsendNotificationAR(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type notification message..."
              />
              <button
                onClick={ARGlassNotificationCommunicate}
                className="flex items-center justify-center px-6 py-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Send Notification
              </button>
            </div>

            {/* Alert Card */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                Send Alert to AR Glass
              </h2>
              <input
                value={sendAlertAR}
                onChange={(e) => setsendAlertAR(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type alert message..."
              />
              <button
                onClick={ARGlassAlertCommunicate}
                className="flex items-center justify-center px-6 py-2 text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600"
              >
                Send Alert
              </button>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="p-6 mt-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Connection Status
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Connected to WebSocket Server</span>
          </div>
        </div>
      </div>
    </div>
  );
};
