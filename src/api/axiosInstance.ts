import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BASE_VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token to every request if available
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
