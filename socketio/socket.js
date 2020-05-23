
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTAyNTIxNjksIm5iZiI6MTU5MDI1MjE2OSwianRpIjoiNTU1OGIyMTMtOGVmYy00NDliLWFjMWQtNjAxYTE1MWRkMmFhIiwiZXhwIjoxNTkwMjUzMDY5LCJpZGVudGl0eSI6ImFkbWluIiwiZnJlc2giOnRydWUsInR5cGUiOiJhY2Nlc3MifQ.1hxXTVX2QgYtWY9OSFXZrj1WeYUhad1V5pwW2eQGnrU"
const io = require('socket.io-client');

let socket = io("wss://nemo-live-science-dev.herokuapp.com", {extraHeaders: { 'Authorization': `Bearer ${token}` }});
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


