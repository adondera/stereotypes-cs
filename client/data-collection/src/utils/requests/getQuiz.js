import axios, { withToken } from "../API";

export function getQuiz(accessToken, callback, errorcallback, version='A') {
  /*
  Configure the connection to attach authorization header with the token
  */
  withToken(accessToken);

  /*
  Send get request to retrieve quiz data from server
  */
  axios
    .get("/quiz", {
      params: {
        version: version
      }
    })
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

export function getVersions(callback, errorcallback) {
  /*
  Send get different quiz versions.
  */
  return axios.get("/quiz-versions");
}
