var socket = require("socket.io-client")("http://localhost:8000");
// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});
socket.emit("message", "hello", (data) => {
  console.log(data); // data will be 'woot'
});
