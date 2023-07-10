import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  params: {},
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
