import axios, {CanceledError} from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.170:8080"
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

export {CanceledError};