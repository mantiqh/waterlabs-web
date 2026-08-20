import axios from 'axios';

import { API_BASE_URL, commonHeaders, normalizeError } from './axios.config';

const axiosWithToken = axios.create({
  baseURL: API_BASE_URL,
  headers: commonHeaders,
});

axiosWithToken.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosWithToken.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    }
    return Promise.reject(normalizeError(error));
  },
);

export default axiosWithToken;
