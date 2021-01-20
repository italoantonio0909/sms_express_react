const express = require("express");
const morgan = require("morgan");
const body_parser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { connection } = require("./socket");
const RoutesMessages = require("./routes/Message");
/*
Initializaction express
*/
const application = express();
/*
Initialization http
*/
const server = http.createServer(application);
/*
Database
*/
require("./database");
/*
Initialization and socket
*/
connection(server);
/*
Settings
*/
application.use(cors());
application.use(body_parser.json());
application.use(body_parser.urlencoded({ extended: false }));
application.set("port", process.env.PORT || 8000);
/*
  Middlewares
*/
application.use(morgan("dev"));
/*
  Routes
*/
application.use(RoutesMessages);

server.listen(application.get("port"), function () {
  console.log(`Server on port ${application.get("port")}`);
});
module.exports = server;
