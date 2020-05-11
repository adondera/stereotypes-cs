// utils/API.js

/*
*  Global configuration for axios.
*
*  */
import axios from "axios";

const instance =  axios.create({
    baseURL: 'http://nemo-live-science-dev.herokuapp.com',
    responseType: "json"
});

// request interceptor

instance.interceptors.request.use(
    config => {
        // Do something before request is sent
        // config.headers['Authorization'] = 'Bearer ' + token;

        // TODO! if(token exists)
        config.headers['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODkyMTExOTUsIm5iZiI6MTU4OTIxMTE5NSwianRpIjoiMjdkNWE1NjItZTk0MS00YzQzLTg1MWEtYzFiNTdjM2VlNWFlIiwiZXhwIjoxNTg5MjEyMDk1LCJpZGVudGl0eSI6ImFsaW4iLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.6vgrMeme8k7ZpGK1n_9RP67ufk3buvHqyvx-nnMkaIc';
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export default instance;