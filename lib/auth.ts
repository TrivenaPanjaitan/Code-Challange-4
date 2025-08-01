import api from './api';

// Register
export const register = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const res = await api.post('/auth/local/register', data);
  return res.data;
};

// Login
export const login = async (data: {
  identifier: string;
  password: string;
}) => {
  const res = await api.post('/auth/local', data);

  const { jwt, user } = res.data;

  localStorage.setItem('token', jwt);
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};
