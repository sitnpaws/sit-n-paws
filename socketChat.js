const debug = process.env.DEBUG || true;

module.exports = function (io) {
  io.on('connection', socket => {
    if (debug) { console.log('user connected'); }

    socket.on('enter chat', chat => { // entering a specific chat id
      if (debug) { console.log('user entered chat: ', chat); }
      socket.join(chat);
    });

    socket.on('leave chat', chat => {
      if (debug) { console.log('user left chat: ', chat); }
      socket.leave(chat);
    });

    socket.on('new message', chat => {
      if (debug) { console.log('user submitted new message in chat: ', chat); }
      io.in(chat).emit('refresh');
    });

    socket.on('started typing', chat => {
      if (debug) { console.log('user started typing in chat: ', chat); }
      socket.to(chat).emit('started typing');
    })

    socket.on('stopped typing', chat => {
      if (debug) { console.log('user stopped typing in chat: ', chat); }
      socket.to(chat).emit('stopped typing');
    })

    socket.on('disconnect', () => {
      if (debug) { console.log('user disconnected...'); }
    });
  });
};
