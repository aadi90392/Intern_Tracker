import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Tera backend port
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Ye sabse zaroori line hai jo error hataegi
export default api;