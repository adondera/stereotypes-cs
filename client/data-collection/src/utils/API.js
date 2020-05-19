// utils/API.js

/*
 *  Global configuration for axios.
 *
 *  */
import axios from "axios";

const instance = axios.create({
  baseURL: "https://nemo-live-science-dev.herokuapp.com",
  responseType: "json",
});

// request interceptor

export const withToken = (token) => {
  console.log(token);
  instance.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = "Bearer " + token;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  return instance;
};
export default instance;
