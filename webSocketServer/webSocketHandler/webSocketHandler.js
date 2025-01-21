const WebSocketRouter = require("../webSocketRouter/webSocketRouter");
module.exports = class WebSocketHandler {
  constructor(wsServer) {
    this.wsServer = wsServer;
    this.wsConnectedClients = new Map();
    this.mainWebSocketConnectionListner();
    this.webSocketRouter = new WebSocketRouter(this.wsConnectedClients);
  }

  addAuthorizedClient(username, wsclient) {
    this.wsConnectedClients.set(username, wsclient);
  }

  mainWebSocketConnectionListner() {
    this.wsServer.on("connection", (wsclient, req) => {
      console.log("new wsclient connecting");

      wsclient.once("message", (message) => {
        const parsedMessage = JSON.parse(message);
        console.log("handshake message recieved : ", parsedMessage);
        this.onceMessageHandler(parsedMessage, wsclient);
      });
    });
  }

  onceMessageHandler(parsedMessage, wsclient) {
    const timeoutId = setTimeout(() => {
      console.log("Authentication timeout. Closing connection.");
      wsclient.send(
        JSON.stringify({
          messageText: "Authentication timeout. Closing connection.",
        })
      );
      wsclient.close();
    }, 5000); // Timeout after 5 seconds

    if (parsedMessage.username) {
      console.log(
        `Hanshake successfull for user : ${parsedMessage.username}, starting to listen for normal messages of this user`
      );

      clearTimeout(timeoutId);

      this.addAuthorizedClient(parsedMessage.username, wsclient);
      wsclient.on("message", (message) => {
        const newParsedMessage = JSON.parse(message);
        this.onMessageHandler(newParsedMessage, parsedMessage.username);
      });
    } else {
      wsclient.send(
        JSON.stringify({
          messageText: `Error! You have failed the handshake procedure, username wasnt recived, what was recieved from you : ${parsedMessage}`,
        })
      );
      wsclient.send(
        JSON.stringify({ messageText: "conection will be closed" })
      );
      wsclient.close();
      console.log(
        "connection closed with new client due to failure in handshake procedure"
      );
    }
  }

  onMessageHandler(parsedMessage, username) {
    this.webSocketRouter.RouteMessage(parsedMessage, username);
  }
};
