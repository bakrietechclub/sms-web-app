/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putRefreshToken(token) {
  localStorage.setItem('refreshToken', token);
}

function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

function deleteToken() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

async function login({ email, password }) {
  const response = await fetchWithAuth('/authentications', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return response.data;
}

async function refreshToken() {
  const response = await fetchWithAuth('/authentications', {
    method: 'PUT',
    body: JSON.stringify({ refreshToken: getRefreshToken() }),
  });
  return response.data;
}

async function getOwnProfile() {
  const response = await fetchWithAuth('/users/me');
  return response.data;
}

export {
  putAccessToken,
  getAccessToken,
  putRefreshToken,
  getRefreshToken,
  deleteToken,
  login,
  refreshToken,
  getOwnProfile,
};
