const io = require('socket.io')();
let users = {};

// runs whenever any browser connects to the server.
io.on('connection', function(socket) {

    // user disconnected
    socket.on('disconnect', function() {
        delete users[socket.io];
        io.emit('update-user-list', Object.values(users));
    });

    // socket is the connected user
    socket.on('add-circle', function(data) {
        // data is the data sent by the client.
        io.emit('add-circle', data); // send the data to all connected clients
    });

    // user connected
    socket.on('register-user', function(data) {
        users[socket.id] = data;
        io.emit('update-user-list', Object.values(users));
    });

    socket.on('clear', function(data) {
        io.emit('clear');
    });
});

module.exports = io;

// .on is how we also listen to messages from clients