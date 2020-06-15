import axios from '../API';

/*
 Send get request to retrieve quiz data from server
 */
export function getQuiz() {
    console.log('AXIOS CALLED');
  return axios.get("/iat");
}
