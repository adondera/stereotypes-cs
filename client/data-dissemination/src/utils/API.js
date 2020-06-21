// utils/API.js

/*
 *  Global configuration for axios.
 *
 *  */
import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  responseType: "json",
});

export default instance;