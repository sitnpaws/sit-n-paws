module.exports = function (io) {
  io.on('connection', socket => {
    console.log('user connected');

    socket.on('enter chat', chat => { // entering a specific chat id
      console.log('user entered chat: ', chat);
      socket.join(chat);
    });

    socket.on('leave chat', chat => {
      console.log('user left chat: ', chat);
      socket.leave(chat);
    });

    socket.on('new message', chat => {
      console.log('user submitted new message: ', chat);
      io.in(chat).emit('refresh messages', chat);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected...');
    });
  });
};
