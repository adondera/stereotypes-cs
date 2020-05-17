import axios, {withToken} from "../API";
export function getQuiz(accessToken, callback, errorcallback) {
    withToken(accessToken)
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