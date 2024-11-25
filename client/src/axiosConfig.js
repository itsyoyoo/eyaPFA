import axios from 'axios';

// Retrieve the token from localStorage (or any other storage mechanism you're using)
const token = localStorage.getItem('token'); 

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }), 
  },
});

export default axiosInstance;
