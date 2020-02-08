const io = require('socket.io')();

// runs whenever any browser connects to the server.
io.on('connection', function(socket) {
    // socket is the connected user
    socket.on('add-circle', function(data) {
        // data is the data sent by the client.
        io.emit('add-circle', data); // send the data to all connected clients
    });

    socket.on('clear', function(data) {
        io.emit('clear');
    });
});

module.exports = io;

// .on is how we also listen to messages from clients