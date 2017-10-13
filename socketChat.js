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
      console.log('user submitted new message in chat: ', chat);
      io.in(chat).emit('refresh');
    });

    socket.on('started typing', chat => {
      console.log('user started typing in chat: ', chat);
      socket.to(chat).emit('started typing');
    })

    socket.on('stopped typing', chat => {
      console.log('user stopped typing in chat: ', chat);
      socket.to(chat).emit('stopped typing');
    })

    socket.on('disconnect', () => {
      console.log('user disconnected...');
    });
  });
};
