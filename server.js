
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.get('/', function(req, res,next){
  res.sendFile('/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('code add', function(code){
    console.log('add: ' + code);
    socket.broadcast.emit('add',code);
  });
  socket.on('code remove', function(code){
    socket.broadcast.emit('remove',code);
    console.log('remove: ' + code);
  });
});

app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function(){
  console.log('listening on '+app.get('port'));
});