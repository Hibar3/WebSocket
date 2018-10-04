//******MAIN Server******//
var port= 4000;
var bodyParser = require('body-parser');
var SSE = require('sse');
var path = require('path');
var fs = require('fs');
const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);

var clients = [];
var msg;

//configure body-parser for express
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',  (req, res) =>  {
   //res.send('Server is running on port'  + port);
	//res.send(msg);
   //res.render('index', {"title":'Hellow'});
   res.sendFile(path.join(__dirname + '/index.html'));// Opens your main html file
});

io.on('connection', (socket) => {

console.log('user connected', socket.id)
var ID = socket.id

socket.on('join', function(userNickname) {

        console.log(userNickname+" : has connected to web server "  + ID );
		//userjoinedthechat is from android 
        socket.broadcast.emit('userjoinedthechat', userNickname +" : has joined the server");
    });


socket.on('messagedetection', (Steps,messageContent) => {
       
       //log the message in console 

       console.log(Steps+" :" +messageContent);
        //create a message object 
       let  message = {"message":messageContent, "Steps":Steps}
	   
	   var json = JSON.stringify(Steps+" :" +messageContent);
          // send the message to the client side  
       io.emit('message', json );
	   
	   //msg=message; //Convert for html usage
     });
      
  
 socket.on('disconnect', function() {
    console.log( ' user has left ');
    socket.broadcast.emit("userdisconnect"," user has left ") ;

});

});


//use default IP address

server.listen(4000,function() {
	/**
   var sse = new SSE(server);

  sse.on('connection', function(stream) {
    clients.push(stream);
    console.log('Opened connection ðŸŽ‰');

    var json = JSON.stringify({ message: 'Gotcha' });
    stream.send(json);
    console.log('Sent: ' + json);

    stream.on('close', function() {
      clients.splice(clients.indexOf(stream), 1);
      console.log('Closed connection ðŸ˜±');
    });
  });
  **/
  
  console.log('Node app is running on port ' + port);

});


