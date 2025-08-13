import axios from "axios";

const api = axios.create({
    // replace with your actual API base URL
    // For example, if your API is running on localhost:8000
    // you can set baseURL to "http://localhost:8000/api"
  baseURL: "http://localhost:8000/api",
});

export default api;
