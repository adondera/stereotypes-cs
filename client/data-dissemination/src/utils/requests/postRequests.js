import axios from "../API";

/*
Send quiz data to the server at the end of quiz
*/
export function sendData(data) {
    var str = JSON.stringify(data, null, 2); // spacing level = 2
    console.log(str);
    return axios
      .post("/calculate", data)
  }
  