const config = require("../config");
const twilio = require("twilio")(config.ACCOUNT_SID, config.AUTH_TOKEN);
const { getSocket } = require("../socket/index");
const responseSms = require("twilio").twiml.MessagingResponse;

const Twilio = {};
Twilio.sendMessage = async (request, response) => {
  try {
    const { message, telephone } = request.body;
    if (!message) {
      response.status(400).json({ message: "Message required" });
    }
    if (!telephone) {
      response.status(400).json({ message: "Telephone required" });
    }
    const telephoneArray = telephone.split("");
    if (telephoneArray[0] === "0") {
      telephoneArray.shift();
      let telephoneWithStateCode = telephoneArray.join("");
      telephoneWithStateCode = `+593${telephoneWithStateCode}`;
      const messageSended = await twilio.messages.create({
        to: telephoneWithStateCode,
        from: config.PHONE_TWILIO,
        body: message,
      });
      console.log(messageSended);
      if (messageSended) {
        response.status(200).json({ message: "Messaged sended" });
      }
    } else {
      response.status(400).json({ telephone: "No avaibled cell phone" });
    }
  } catch (e) {
    console.log(e);
  }
};

Twilio.receivedMessage = (request, response) => {
  console.log(
    `Mensaje: ${request.body.Body} ----- del teléfono: ${request.body.From}`
  );
  const sendResponse = new responseSms();
  sendResponse.message("Estamos procesando sus datos...");
  response.send(sendResponse.toString());
};
module.exports = Twilio;
