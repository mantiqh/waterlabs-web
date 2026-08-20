import axios from 'axios';

import { API_BASE_URL, commonHeaders, normalizeError } from './axios.config';

const axiosWithoutToken = axios.create({
  baseURL: API_BASE_URL,
  headers: commonHeaders,
});

axiosWithoutToken.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(normalizeError(error)),
);

export default axiosWithoutToken;
