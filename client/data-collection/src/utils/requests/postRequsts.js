import axios from "../API";

/*
Check credentials and request Authorization
*/
export function login(data, callback, errorcallback) {
  axios
    .post("/login", data)
    .then((res) => {
      console.log(res);
      if (callback != null && res.status === 200) {
        callback(res);
      }
    })
    .catch((err) => {
      console.log(err);
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

/*
Send quiz data to the server at the end of quiz
*/
export function sendData(data, childId, callback, errorcallback) {
  axios
    .post("/submit", { ...data, id: childId })
    .then((res) => {
      console.log(res);
      if (callback != null && res.status === 200) {
        callback(res);
      }
    })
    .catch((err) => {
      console.log(err);
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}
