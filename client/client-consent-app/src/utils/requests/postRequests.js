import axios from "../API";

export function postData(data, callback, errorcallback){
    axios.post('/posts', data)
        .then(res => {
            //do something
            console.log(res);
            if(callback != null){
                callback(res);
            }
        })
        .catch(err => {
            // catch error
            if(errorcallback != null){
                errorcallback(err);
            }
        })
}