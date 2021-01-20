const socketIo = require("socket.io");

let socket;

const connection = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (client) => {
    socket = client;
  });
};

const getSocket = () => {
  return socket;
};

module.exports = { connection, getSocket };
