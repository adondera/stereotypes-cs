import axios from "../API";

export function getQuiz(callback, errorcallback) {
    axios
        .get("/protected")
        .then((res) => {
            //do something
            console.log(res);
            if (callback != null && res.status === 200) {
                callback(res);
            }
            return res;
        })
        .catch((err) => {
            // catch error
            console.log("COMPLETE DISASTER!");
            if (errorcallback != null) {
                errorcallback(err);
            }
        });
}