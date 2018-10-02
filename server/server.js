const path=require("path");
const http = require('http');
const express = require('express');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname,'../public');
let port =process.env.PORT||3000;
const app = express();

let server = http.createServer(app);
let io= socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.on("disconnect",()=>{
        console.log('user disconnected');
    });
  socket.on('createMessage',(newMessage)=>{
      io.emit('newMessage',{
          from:newMessage.from+'io',
          text:newMessage.txt,
          createdAt:new Date().getTime()
      });
      socket.broadcast.emit('newMessage',{
        from:newMessage.from+'broadcast',
        text:newMessage.text,
        createdAt:new Date().getTime()
    });
      console.log( newMessage);
  });
});

server.listen(port,()=>{
    console.log('server started');
});
