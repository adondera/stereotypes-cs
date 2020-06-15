import axios from "../API";

/*
Send quiz data to the server at the end of quiz
*/
export function sendData(data) {
    
    return axios
      .post("/calculate", data)
  }
  