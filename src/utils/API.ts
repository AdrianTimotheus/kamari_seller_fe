import axios from 'axios';
import { getToken, isLoggedIn, saveLogin } from './Auth';
import { apiUrl } from './Values';

export const axiosPublic = axios.create({
  baseURL: apiUrl,
});

export const axiosPrivate = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const fetchToken = async () => {
  const response = await axios.get(`${apiUrl}/refresh-token`)
    .then((res) => res.data.idToken)
    .catch((err) => {
      if (err.response.status === 401) window.location.href = '/logout';
    });
  return response;
};

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (isLoggedIn()) {
      if ([401, 403].includes(error?.response?.status) && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newToken = await fetchToken();
        if (newToken) {
          prevRequest.headers.Authorization = `Bearer ${newToken}`;
          saveLogin(newToken);
        }
        return axiosPrivate(prevRequest);
      }
    } else {
      window.location.href = '/logout';
    }
    return Promise.reject(error);
  },
);
