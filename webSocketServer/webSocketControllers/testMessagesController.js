const echoBackMyMessage = (parsedMessage, username, WebSocketRouter) => {
  console.log(WebSocketRouter.wsConnectedClients);
  WebSocketRouter.wsConnectedClients
    .get(username)
    .send(JSON.stringify({ messageText: parsedMessage.messageText }));
};

module.exports = { echoBackMyMessage };
