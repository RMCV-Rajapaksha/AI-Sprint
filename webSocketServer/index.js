require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const websocketPackage = require("ws");

const expressApp = express();

const server = http.createServer(expressApp);

const wsServer = new websocketPackage.Server({ server });

const serverPort = process.env.PORT | 5000;
server.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}`);
});
