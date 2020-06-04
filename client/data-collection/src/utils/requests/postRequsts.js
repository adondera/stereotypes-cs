import axios from "../API";

/*
Check credentials and request Authorization
*/
export function login(data, callback, errorcallback) {
  axios
    .post("/login", data)
    .then((res) => {
      if (callback != null && res.status === 200) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}

/*
Send quiz data to the server at the end of quiz
*/
export function sendData(data, childInfo, dispatch, callback, errorcallback) {
  axios
    .post("/answers", { ...data, id: childInfo.childId, notes: childInfo.notes })
    .then((res) => {
      if (callback != null && res.status === 200) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        //answers are logged when answers failed to be sent
        console.log(JSON.stringify({ ...data, id: childInfo.childId, notes: childInfo.notes }, null, 2));
        errorcallback(err);
      }
    });
}
