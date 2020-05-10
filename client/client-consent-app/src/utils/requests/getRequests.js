import axios from "../API";

export function getData(data, callback, errorcallback){
    axios.get('/posts', data)
        .then(res => {
            console.log(res);
            //do something
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