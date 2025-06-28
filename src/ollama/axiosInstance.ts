// src/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:11434/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
