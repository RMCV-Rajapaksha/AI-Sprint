const sendMessageToARGlass = (parsedMessage, target, WebSocketRouter) => {
  console.log("Communicating to AR glass", parsedMessage);
  WebSocketRouter.wsConnectedClients
    .get(target)
    .send(JSON.stringify({ ...parsedMessage }));
};

module.exports = { sendMessageToARGlass };
