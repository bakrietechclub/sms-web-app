/* istanbul ignore file */

const { VITE_API_PROTOCOL, VITE_API_HOST, VITE_API_PORT } = import.meta.env;
const BASE_URL = `${VITE_API_PROTOCOL}://${VITE_API_HOST}:${VITE_API_PORT}`;

// Helper untuk mengambil token
function getAccessToken() {
  return localStorage.getItem('accessToken');
}

/**
 * Helper function for making authenticated API requests.
 * It automatically adds the Authorization header and handles generic error status.
 *
 * @param {string} endpoint - The API endpoint to hit.
 * @param {object} options - Fetch API options (method, body, etc.).
 * @returns {Promise<object>} The JSON data from the response.
 * @throws {Error} If the API response status is not 'success'.
 */
async function fetchWithAuth(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await response.json();
  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return responseJson;
}

export { fetchWithAuth };
