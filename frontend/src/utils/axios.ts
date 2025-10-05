// services/api.ts
import axios from "axios";

const NEXT_PUBLIC_API = process.env.NEXT_PUBLIC_API || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API, // e.g. http://localhost:5000/api
});

export default axiosInstance;