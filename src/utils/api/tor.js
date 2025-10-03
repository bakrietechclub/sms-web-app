/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

/**
 * Menambahkan data TOR baru.
 * @param {object} payload - Objek yang berisi data TOR.
 * @returns {Promise<object>} Data TOR yang baru ditambahkan.
 */
async function addTor(payload) {
  const responseJson = await fetchWithAuth('/partnerships/tor', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

/**
 * Mengambil data TOR berdasarkan ID.
 * @param {number} id - ID TOR.
 * @returns {Promise<object>} Data TOR.
 */
async function getTorById({ id }) {
  const responseJson = await fetchWithAuth(`/partnerships/tor/${id}`);
  return responseJson.data;
}

/**
 * Mengambil semua data TOR.
 * @returns {Promise<array>} Array data TOR.
 */
async function getTor() {
  const responseJson = await fetchWithAuth('/partnerships/tor');
  return responseJson.data;
}

async function getTorOptions({ q }) {
  const responseJson = await fetchWithAuth(`/partnerships/tor-options?q=${q}`);
  return responseJson.data;
}

/**
 * Menghapus data TOR berdasarkan ID.
 * @param {number} id - ID TOR.
 * @returns {Promise<string>} Pesan dari API.
 */
async function deleteTorById({ id }) {
  const responseJson = await fetchWithAuth(`/partnerships/tor/${id}`, {
    method: 'DELETE',
  });
  return responseJson.message;
}

/**
 * Memperbarui data TOR berdasarkan ID.
 * @param {number} id - ID TOR.
 * @param {object} payload - Objek yang berisi data yang diperbarui.
 * @returns {Promise<object>} Data TOR yang diperbarui.
 */
async function updateTorById({ id, payload }) {
  const responseJson = await fetchWithAuth(`/partnerships/tor/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

export {
  addTor,
  getTorById,
  getTor,
  getTorOptions,
  deleteTorById,
  updateTorById,
};
