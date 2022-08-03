import axios from "axios";

const instance = axios.create({
  baseURL: "http://193.123.252.22:8282/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
