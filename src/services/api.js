import axios from "axios";

const instance = axios.create({
  // Prod
  baseURL: "/api",

  // Dev
  // baseURL: "http://localhost:8081/api",
  // baseURL: "http://193.123.252.22:8282/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
