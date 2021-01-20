const Routes = require("express").Router();
const Twilio = require("../twilio/Twilio");

Routes.post("/api/send-message/", Twilio.sendMessage);
Routes.post("/api/received-message/", Twilio.receivedMessage);

module.exports = Routes;
