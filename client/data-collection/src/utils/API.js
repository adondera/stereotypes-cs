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

export default instance;