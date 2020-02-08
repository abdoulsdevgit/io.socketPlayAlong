const socket = io();
console.log(socket);

socket.on('add-circle', function(data) {
    //console.log(data);
    creatCircle(data);
});

socket.on('clear', function(data) {
    circles.innerHTML = '';
});




const circles = document.getElementById('circles');
const users = document.getElementById('users');

let initials = prompt('Enter your Initials');

socket.emit('register-user',initials);

socket.on('update-user-list', function (data) {
    var userList = '<li>' + data.join('</li><li>') + '</li>';
    users.innerHTML = userList;
});

circles.addEventListener('click', function(event) {
    //this.style.backgroundColor = 'red';
    // creatCircle(event.clientX, event.clientY, generateRandom(10, 125), generateRandomColor());
    console.log(initials);
    socket.emit('add-circle', {
        initials,
        x: event.clientX,
        y: event.clientY,
        size: generateRandom(10, 125),
        color: generateRandomColor(),
    });
});

// clear button
const clear = document.querySelector('button');
clear.addEventListener('click', function() {
    circles.innerHTML = '';
    // let's clear it for everybody
    socket.emit('clear');
});

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function creatCircle({x, y, size, color, initials}) {
    console.log(x, y);
    let circle = document.createElement('div');
    circle.style.left = x - Math.floor(size / 2 + 0.5) + 'px';
    circle.style.top = y - Math.floor(size / 2 + 0.5) + 'px';
    circle.style.width = size + 'px';
    circle.style.height = size + 'px';
    circle.style.backgroundColor = color;
    circle.style.fontSize = Math.floor(size / 3) + 'px';
    circle.style.display = 'flex';
    circle.style.alignItems = 'center';
    circle.style.justifyContent = 'center';
    circle.innerHTML = initials;

    circles.append(circle);
    
}

function generateRandomColor(){
    return `rgba(${generateRandom(0, 255)},${generateRandom(0, 255)},${generateRandom(0, 255)},${generateRandom(2, 10) / 10})`;
}