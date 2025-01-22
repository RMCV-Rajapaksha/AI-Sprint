require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const WebsocketHandler = require("./webSocketHandler/webSocketHandler");
const websocketPackage = require("ws");

const expressApp = express();

const server = http.createServer(expressApp);

const wsServer = new websocketPackage.Server({ server });

new WebsocketHandler(wsServer);

const serverPort = process.env.PORT | 5000;
server.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`);
});
