import axios, { CanceledError } from "axios";

const instance = axios.create({
  baseURL: "http://churripuntosback-c344087cacf4.herokuapp.com",
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

export { CanceledError };
