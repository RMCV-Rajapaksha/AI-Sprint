const echoBackMyMessage = (parsedMessage, username, WebSocketRouter) => {
  WebSocketRouter.wsConnectedClients
    .get(username)
    .send(JSON.stringify({ messageText: parsedMessage.messageText }));
};

module.exports = { echoBackMyMessage };
