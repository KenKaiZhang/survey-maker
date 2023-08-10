import axios from "axios";

const baseURL = "http://localhost:5500";

export const ApiClient = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
});
