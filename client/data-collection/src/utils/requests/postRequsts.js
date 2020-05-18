import axios from "../API";

export function login(data, callback, errorcallback) {
  axios
    .post("/login", data)
    .then((res) => {
      //do something
      console.log(res);
      if (callback != null && res.status === 200) {
        callback(res);
      }
    })
    .catch((err) => {
      // catch error
      console.log("COMPLETE DISASTER!");
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}


export function sendData(data, callback, errorcallback) {
  console.log(axios.interceptors.request)
  axios
  //TODO! change me
    .post("/submit", {...data})
    .then((res) => {
      //do something
      console.log(res);
      if (callback != null && res.status === 200) {
        callback(res);
      }
    })
    .catch((err) => {
      // catch error
      console.log("COMPLETE DISASTER!");
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
}
