import axios, { type AxiosError, AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000",
  headers: { "Accept": "application/json", "Duffel-Version": "v2" },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookies.get("golafly:token") ?? process.env.NEXT_PUBLIC_API_TOKEN;
  if (token) {
    config.headers = config.headers || new AxiosHeaders();
    if (!config.headers.has("Authorization")) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      Cookies.remove("golafly:token");
      Cookies.remove("golafly:user");
    }
    return Promise.reject(err);
  },
);

export default axiosInstance;
