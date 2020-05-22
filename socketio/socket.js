

let token = 
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTAxNzQyOTQsIm5iZiI6MTU5MDE3NDI5NCwianRpIjoiNzc4ZTRlZjctN2I3Mi00ZGUyLWI0MzQtMmE1N2UyMDg5ZmIyIiwiZXhwIjoxNTkwMTc1MTk0LCJpZGVudGl0eSI6ImFkbWluIiwiZnJlc2giOnRydWUsInR5cGUiOiJhY2Nlc3MifQ.q6aAwEe0u0VY2a0zDEPDDl7R9wlDf6i7aqEyRoZLZC8"
const io = require('socket.io-client');

let socket = io("wss://nemo-live-science-dev.herokuapp.com/", {extraHeaders: { 'Authorization': `Bearer ${token}` }});
let free = true
let readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


socket.emit("message", "hello", (data) => {
  console.log(data); // data will be 'woot'
});

socket.on("free-laptops", () => {
  console.log(`received event 'free-laptops', I am free=${free}`)
  if (free == true){
    console.log("I am free, emitting 'free'")
    socket.emit("free", "I am free", (data) => {
      if(data) {
        free = false
        console.log(data)
      }
    })
  }
})

var recursiveAsyncReadLine = function () {
  readline.question("Press a key to emit 'ended-test' ", function(input) {
    free = true  
    if (input == 'close')
      readline.close();

    socket.emit("free", "I am free", (data) => {
      if(data) {
        free = false
        console.log(data)
      }
    })
    recursiveAsyncReadLine();
  });
}


recursiveAsyncReadLine();


