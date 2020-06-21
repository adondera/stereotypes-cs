// utils/API.js

/*
*  Global configuration for axios.
*
*  */

import axios from "axios";

const instance =  axios.create({
    //TODO! change me
    baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    responseType: "json"
});

export default instance;