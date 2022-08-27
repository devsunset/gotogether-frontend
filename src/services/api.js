import axios from "axios";

const instance = axios.create({
  // Prod
  baseURL: "http://193.123.252.22:8282/api",

  // Dev
  // baseURL: "http://localhost:8081/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
