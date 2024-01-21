import axios from "axios";
axios.defaults.baseURL = "https://localhost:8443";

export default axios.create();

export const axiosPrivate = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
