const api = (() => {
  const { VITE_API_PROTOCOL, VITE_API_HOST, VITE_API_PORT } = import.meta.env;
  const BASE_URL = `${VITE_API_PROTOCOL}://${VITE_API_HOST}:${VITE_API_PORT}`;

  console.log('API Base URL:', BASE_URL);

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  function putRefreshToken(token) {
    return localStorage.setItem('refreshToken', token);
  }

  function getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  function deleteToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/authentications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson;
  }

  async function refreshToken() {
    const response = await _fetchWithAuth(`${BASE_URL}/authentications`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: `${getRefreshToken()}`,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    putAccessToken(data.accessToken);
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    return responseJson;
  }

  return {
    // USER (AUTH)
    putAccessToken,
    getAccessToken,
    putRefreshToken,
    getRefreshToken,
    refreshToken,
    deleteToken,
    login,
    getOwnProfile,
  };
})();

export default api;
