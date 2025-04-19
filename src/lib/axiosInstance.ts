import axios from "axios";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// // 응답 인터셉터 추가 (예: 토큰 만료 시 처리)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error("인증 오류: 다시 로그인 필요");
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
