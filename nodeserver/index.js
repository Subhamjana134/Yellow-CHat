// change 
// mongoose 
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

//Mongoose specific stuff
mongoose.connect('mongodb://localhost:27017/yellowmessage',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  //Define mongoose Scema
const MessageSchema = new mongoose.Schema({
    // name:String,
    message:String
  });

  const Message = mongoose.model("Message", MessageSchema); 
// change 

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
//change
        let data2 = new Message({message}); 
        console.log({message});  //change

        data2.save()
        .then(doc => {
          console.log(doc);
        })
        .catch(err => {
          console.error(err)
        }) 
    });
// change 

    socket.on('disconnect', message => { //when get send event run arrow function
        socket.broadcast.emit('left', user[socket.id]); //broadcast other the sent message along with his name
        delete user[socket.id];
    });
});








