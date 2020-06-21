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
export function sendData(data, childInfo, version ,callback, errorcallback) {
  var dataToBeSent = {}
  dataToBeSent.id = childInfo.childId
  dataToBeSent.version = version
  dataToBeSent.data = []
  data.forEach(answer => {
    dataToBeSent.data.push(answer)
  });
  
  axios
    .post("/answers", dataToBeSent)
    .then((res) => {
      if (callback != null && res.status === 201) {
        callback(res);
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(dataToBeSent, null, 2));
      if (errorcallback != null) {
        //answers are logged when answers failed to be sent
        errorcallback(err);
      }
    });
}
