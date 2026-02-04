module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Receive message from client
    socket.on("chat:send", (data) => {
      /*
        data = {
          userId,
          message,
          time
        }
      */

      // Broadcast message to ALL connected clients
      io.emit("chat:receive", data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
