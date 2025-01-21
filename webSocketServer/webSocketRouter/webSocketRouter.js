const {
  echoBackMyMessage,
} = require("../webSocketControllers/testMessagesController");
module.exports = class WebSocketRouter {
  constructor(wsConnectedClients) {
    this.wsConnectedClients = wsConnectedClients;
  }

  RouteMessage(parsedMessage, username) {
    if (parsedMessage.Route) {
      if (parsedMessage.Route == "/echoBackMyMessage") {
        echoBackMyMessage(parsedMessage, username, this);
      } else if (parsedMessage.Route == "/sendThisToARGlass") {
      }
    } else {
      this.wsConnectedClients
        .get(username)
        .send(JSON.stringify({ messageText: "Error! Route not specified" }));
    }
  }
};
