import axios from "axios";
const ax = axios.create({
  baseURL: "http://localhost:8082/v1",
  timeout: 5000,
  headers: { token: localStorage.getItem("token") },
});
export default ax;
