const io = require('socket.io')(80, {
    cors: {
        origin: '*',
    }
});

const user = {}

io.on('connection', socket => { //when connection come to socket run an arrow function
    socket.on('new-user-joined', name => {
        user[socket.id] = name; //// give user a key of socket id which is equals to name
        console.log('new user', name);  //when new user joined  take his name run arrow function
        socket.broadcast.emit('user-joined', name); //broadcast other user new user joined with a name
    });

    socket.on('send', message => { //when get send event run arrow function
        socket.broadcast.emit('recieve', { name: user[socket.id], message: message }); //broadcast other the sent message along with his name
    });

    socket.on('disconnect', message => { //when get send event run arrow function
        socket.broadcast.emit('left', user[socket.id]); //broadcast other the sent message along with his name
        delete user[socket.id];
    });
});








