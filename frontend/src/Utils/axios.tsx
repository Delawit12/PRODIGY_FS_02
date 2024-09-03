import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/", // api url
  //   baseURL: "https://prodigy-fs-01-1.onrender.com", // api url

  withCredentials: true,
});

export default instance;
