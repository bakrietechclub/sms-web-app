/* istanbul ignore file */

const { VITE_API_PROTOCOL, VITE_API_HOST, VITE_API_PORT } = import.meta.env;
const BASE_URL = `${VITE_API_PROTOCOL}://${VITE_API_HOST}:${VITE_API_PORT}`;
const REQUEST_TIMEOUT_MS = 30000;
const AUTH_ENDPOINT = '/authentications';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

// Tracks a single in-flight refresh so concurrent 401s don't each trigger their own refresh.
let refreshPromise = null;

async function requestNewAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const response = await fetch(`${BASE_URL}${AUTH_ENDPOINT}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: getRefreshToken() }),
      });
      const json = await parseJsonSafely(response);
      if (!response.ok || json?.status !== 'success') {
        clearTokens();
        throw new Error(json?.message || 'Sesi Anda telah berakhir, silakan login kembali.');
      }
      localStorage.setItem('accessToken', json.data.accessToken);
      return json.data.accessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

async function parseJsonSafely(response) {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function performRequest(endpoint, options) {
  const url = `${BASE_URL}${endpoint}`;
  const accessToken = getAccessToken();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...options.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Permintaan memakan waktu terlalu lama, silakan coba lagi.');
    }
    throw new Error('Tidak dapat terhubung ke server, periksa koneksi Anda.');
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Helper function for making authenticated API requests.
 * It automatically adds the Authorization header, refreshes an expired access
 * token once on a 401, and handles generic error status.
 *
 * @param {string} endpoint - The API endpoint to hit.
 * @param {object} options - Fetch API options (method, body, etc.).
 * @returns {Promise<object>} The JSON data from the response.
 * @throws {Error} If the API response status is not 'success'.
 */
async function fetchWithAuth(endpoint, options = {}) {
  let response = await performRequest(endpoint, options);

  if (response.status === 401 && endpoint !== AUTH_ENDPOINT && getRefreshToken()) {
    try {
      await requestNewAccessToken();
      response = await performRequest(endpoint, options);
    } catch {
      window.location.assign('/');
      throw new Error('Sesi Anda telah berakhir, silakan login kembali.');
    }
  }

  const responseJson = await parseJsonSafely(response);

  if (!response.ok || responseJson?.status !== 'success') {
    throw new Error(responseJson?.message || `Terjadi kesalahan pada server (${response.status}).`);
  }

  return responseJson;
}

/**
 * Membangun query string dari sebuah objek, melewati key yang nilainya
 * undefined/null/'' (supaya param opsional seperti filter status tidak
 * ikut terkirim sebagai string "undefined"), dan meng-encode tiap value
 * lewat URLSearchParams -- perlu untuk value seperti "Re-Audiensi" atau
 * pencarian yang mengandung '&'/'#'/spasi.
 *
 * @param {object} params
 * @returns {string} mis. "?q=a&typeId=1%2C2"
 */
function buildQueryString(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    searchParams.set(key, value);
  });
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export { fetchWithAuth, buildQueryString };
