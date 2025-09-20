import axios from "axios";

const axiosUserService = axios.create({
  baseURL: import.meta.env.VITE_USER_SERVICE_URL,
});

axiosUserService.interceptors.request.use(
  (config) => {
    if (config.url !== "/login") {
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosUserService.interceptors.response.use(
  (response) => response.data,
  (error) => error.response.data
);

export default axiosUserService;
