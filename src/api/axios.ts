import axios from 'axios';

import { checkIsAuthorized } from '../utils';

import { BASE_URL } from '/src/constants/envVarables';

const createAxiosInstance = (priceKey?: string) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });
  if (priceKey) {
    axiosInstance.defaults.headers['priceKey'] = priceKey;
  }
  const token = localStorage.getItem('token');
  if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
  axiosInstance.interceptors.response.use(
    (config) => config,
    async (config) => {
      const originalRequest = config.config;

      if (config.response && config.response.status === 401) {
        if (!refreshToken) {
          window.location.reload();
        }
        const data = await checkIsAuthorized(refreshToken as string);
        if (data) {
          const { isAuthorized, token } = data;
          if (!isAuthorized) {
            localStorage.clear();
            window.location.reload();
          }
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      }
      return Promise.reject(config);
    },
  );

  return axiosInstance;
};

export default createAxiosInstance;
