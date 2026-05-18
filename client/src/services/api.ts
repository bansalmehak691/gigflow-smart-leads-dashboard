import axios from "axios";

const API = axios.create({
  baseURL: "https://gigflow-smart-leads-dashboard-2.onrender.com/api",
});

export default API;