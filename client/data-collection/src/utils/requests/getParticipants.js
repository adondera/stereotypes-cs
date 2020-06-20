import axios, { withToken } from "../API";

export function getParticipants(accessToken, callback, errorcallback) {
  /*
  Configure the connection to attach authorization header with the token
  */
  withToken(accessToken);

  /*
  Send get request to retrieve all participants from the current day
  */
  axios
    .get("/active-participants", {})
    .then((res) => {
      if (callback != null && res.status === 200) {
        callback(res);
      }
      return res;
    })
    .catch((err) => {
      console.log("here");
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}
