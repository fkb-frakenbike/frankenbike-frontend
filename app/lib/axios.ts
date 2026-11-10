import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
});

// The API rejects state-changing requests without this header (CSRF guard).
const WRITE_METHODS = ['post', 'put', 'patch', 'delete'];

api.interceptors.request.use((config) => {
  if (WRITE_METHODS.includes((config.method ?? 'get').toLowerCase())) {
    config.headers.set('X-Requested-With', 'fkb');
  }
  return config;
});

export default api;
