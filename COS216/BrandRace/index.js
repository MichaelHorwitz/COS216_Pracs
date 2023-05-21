const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const readline = require('readline');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

var usernamesInUse = [];
var rooms = [];
var numRooms = 0;

function checkUsername(username, socketID){
  var inUse = false;
  //console.log("InputUsername: " + username);
  usernamesInUse.forEach(element => {
    //console.log("currUsername: " + element.username);
    if (element.username == username) {
      inUse = true;
    }
  });
  if (inUse) {
    return false;
  }
  usernamesInUse.push({username: username, socketID: socketID});
  return true;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('checkUsername', (username) => {
    if(checkUsername(username, socket.id)){
      socket.emit('usernameResult', {socketID: socket.id, username:username, result:true});
    } else {
      socket.emit('usernameResult', {socketID: socket.id, username:username, result:false});
    }
  });
  socket.on('createNewGame', ()=>{
    socket.join(numRooms);
    numRooms = numRooms + 1;
    socket.emit('gameID', (numRooms-1));
  });

});

var portNum;
try {
  rl.question('Enter your input: ', (input) => {
    console.log('User input:', input);
    portNum = input;
    server.listen(portNum, () => {
      console.log('listening on *' + portNum);
    });  
    rl.close();
  });  
} catch (error) {
  console.log("Port taken");
  console.log(error);
}


