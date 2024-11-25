import axios from "axios";
const axiosConfig = axios.create({
  // baseURL: "http://localhost:3000/api",
    baseURL: "https://vixol72czg.execute-api.us-east-1.amazonaws.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosConfig;
