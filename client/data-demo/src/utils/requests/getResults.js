import axios, { withToken } from "../API";
export function getResults(accessToken, callback, errorcallback) {
  /*
  Configure the connection to attach authorization header with the token
  */
  withToken(accessToken);

  /*
  Send get request to retrieve results from server
  */
  return axios.get("/results");
}
