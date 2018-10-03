const path=require("path");
const http = require('http');
const express = require('express');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname,'../public');
let port =process.env.PORT||3000;
const app = express();
const {generateMessage,generateLocationMessage}=require('./utils/message');
let server = http.createServer(app);
let io= socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.on("disconnect",()=>{
        console.log('user disconnected');
    });

    socket.emit('newMessage',generateMessage('admin','hello there'));
    socket.broadcast.emit('newMessage',generateMessage("admin",'a new member joined'));


    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('admin',coords.latitude,coords.longitude));
    });
    
     socket.on('createMessage',(newMessage,callback)=>{
      io.emit('newMessage',generateMessage(
        newMessage.from,
        newMessage.text
    ));

      console.log( newMessage);
      callback('this is from server');
  });
});

server.listen(port,()=>{
    console.log('server started');
});
