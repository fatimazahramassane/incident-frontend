import axios from 'axios';
import api from './api';

const AUTH_BASE_URL = 'http://localhost:8081/auth';

export const authService = {
  register: async (userData) => {
    const response = await axios.post(`${AUTH_BASE_URL}/register`, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${AUTH_BASE_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('fullName', response.data.fullName);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
  },

  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
};

export default authService;