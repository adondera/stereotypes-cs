import axios from '../API';

/*
 Send get request to retrieve quiz data from server
 */
export function getQuiz() {
  return axios.get("/iat");
}
