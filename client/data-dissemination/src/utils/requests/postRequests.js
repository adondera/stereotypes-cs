import axios from "../API";

/*
Send quiz data to the server at the end of quiz
*/
export function sendData(data) {
    //JSON.stringify(data, null, 2); // for printing data
    return axios
      .post("/calculate", data)
  }
  