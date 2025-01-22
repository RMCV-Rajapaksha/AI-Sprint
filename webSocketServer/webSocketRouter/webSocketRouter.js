const {
  echoBackMyMessage,
} = require("../webSocketControllers/testMessagesController");
const {
  sendMessageToARGlass,
} = require("../webSocketControllers/communicateWithARController");
module.exports = class WebSocketRouter {
  constructor(wsConnectedClients) {
    this.wsConnectedClients = wsConnectedClients;
  }

  RouteMessage(parsedMessage, username) {
    if (parsedMessage.Route) {
      if (parsedMessage.Route == "/echoBackMyMessage") {
        echoBackMyMessage(parsedMessage, username, this);
      } else if (parsedMessage.Route == "/displayMessageInARGlass") {
        sendMessageToARGlass(parsedMessage, parsedMessage.target, this);
      }
    } else {
      this.wsConnectedClients
        .get(username)
        .send(JSON.stringify({ messageText: "Error! Route not specified" }));
    }
  }
};
