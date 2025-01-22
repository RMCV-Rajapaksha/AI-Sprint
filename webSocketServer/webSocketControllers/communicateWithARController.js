const sendMessageToARGlass = (parsedMessage, target, WebSocketRouter) => {
  WebSocketRouter.wsConnectedClients
    .get(target)
    .send(JSON.stringify({ messageText: parsedMessage.messageText }));
};

module.exports = { sendMessageToARGlass };
