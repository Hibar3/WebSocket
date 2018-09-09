//******MAIN Server******//
var port= 4000;
const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.get('/', (req, res) => {

res.send('Server is running on port'  + port)
});
io.on('connection', (socket) => {

console.log('user connected', socket.id)
var ID = socket.id

socket.on('join', function(userNickname) {

        console.log(userNickname+" : has connected to web server "  + ID );
		//userjoinedthechat is from android 
        socket.broadcast.emit('userjoinedthechat', userNickname +" : has joined the server");
    });


socket.on('messagedetection', (senderNickname,messageContent) => {
       
       //log the message in console 

       console.log(senderNickname+" :" +messageContent)
        //create a message object 
       let  message = {"message":messageContent, "senderNickname":senderNickname}
          // send the message to the client side  
       io.emit('message', message );
     
      });
      
  
 socket.on('disconnect', function() {
    console.log( ' user has left ')
    socket.broadcast.emit("userdisconnect"," user has left ") 

});

});



//use default IP address

server.listen(4000,()=>{

console.log('Node app is running on port ' + port);

});
