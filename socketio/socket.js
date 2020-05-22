

let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTAxNjE4MzgsIm5iZiI6MTU5MDE2MTgzOCwianRpIjoiN2Q4OWZhM2ItZWU1YS00MmM0LTk1YTYtNGUxMjAzMDk0OWRiIiwiZXhwIjoxNTkwMTYyNzM4LCJpZGVudGl0eSI6ImFkbWluIiwiZnJlc2giOnRydWUsInR5cGUiOiJhY2Nlc3MifQ.6bj4aLgjXjcnq_BKOoN9IMaX8tNo55YnzVFtoG1kbNg'
const io = require('socket.io-client');

let socket = io("http://localhost:5000", {extraHeaders: { 'Authorization': `Bearer ${token}` }});
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


