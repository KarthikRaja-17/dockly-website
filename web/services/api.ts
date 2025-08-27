import axios from 'axios';

// export const API_URL = 'http://localhost:5000/server/api';
export const API_URL = 'https://dockly-website.onrender.com/server/api';
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function saveConfig(params: any) {
  return api.post('/save/auth/config', params);
}

export async function addWishList(params: any) {
  return api.post('/add/auth/wishlist', params);
}
export async function verifyEmail(params: any) {
  return api.post('/verify/auth/email', params);
}

export async function getConfig(params: any) {
  return api.get('/get/auth/config', {
    params: { ...params },
  });
}

export async function authenticateAdmin(credentials: {
  username: string;
  password: string;
}) {
  return api.post('/auth/admin', credentials);
}
