import axios from "axios";

const axiosBookService = axios.create({
  baseURL: import.meta.env.VITE_BOOK_SERVICE_URL,
});

axiosBookService.interceptors.request.use(
  (config) => {
    const allowedPath = [
      "get-all-book",
      "get-book-info",
      "get-book-image",
      "book-filtering",
      "book-searching",
    ];
    const url = config.url.split("/").at(-1);

    if (!allowedPath.includes(url)) {
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosBookService.interceptors.response.use(
  (response) => response.data,
  (error) => error.response.data
);

export default axiosBookService;
