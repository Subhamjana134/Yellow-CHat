const socket = io('http://localhost:80')


const form = document.getElementById('form');
const msg = document.getElementById('text');
const container = document.querySelector('.container')

let audio = new Audio('../img/ring.mp3');


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.append(messageElement);
    if (position == 'left') {

        audio.play();
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msg.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    msg.value = "";
});

const name = prompt('Enter Your Name?');
socket.emit('new-user-joined', name);

// changes
const welcome = document.getElementById('welcome');
welcome.innerText = `User : ${name}`;
// changes

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');

});

socket.on('recieve', data => {
    append(`${data.name}:${data.message}`, 'left');
});

socket.on('left', name => {
    append(`${name} left the chat`, 'left');

});