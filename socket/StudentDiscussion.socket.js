module.exports = (io, socket) => {
  socket.on("chat:send", (data) => {
    /*
      data = {
        roomId,
        userId,
        message
      }
    */

    io.to(data.roomId).emit("chat:receive", {
      userId: data.userId,
      message: data.message,
      time: new Date().toISOString()
    });
  });

  socket.on("chat:join", (roomId) => {
    socket.join(roomId);
  });

  socket.on("chat:leave", (roomId) => {
    socket.leave(roomId);
  });
};
