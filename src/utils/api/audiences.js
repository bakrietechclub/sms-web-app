/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

/**
 * Menambahkan data audiens baru.
 * @param {object} payload - Objek yang berisi data audiens.
 * @returns {Promise<object>} Data audiens yang baru ditambahkan.
 */
async function addAudience(payload) {
  const responseJson = await fetchWithAuth('/research/potential', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

/**
 * Mengambil data audiens berdasarkan ID.
 * @param {number} id - ID audiens.
 * @returns {Promise<object>} Data audiens.
 */
async function getAudienceById({ id }) {
  const responseJson = await fetchWithAuth(`/audiences/${id}`);
  return responseJson.data;
}

/**
 * Mengambil semua data audiens.
 * @returns {Promise<array>} Array data audiens.
 */
async function getAudiences() {
  const responseJson = await fetchWithAuth('/audiences');
  return responseJson.data;
}

/**
 * Menghapus data audiens berdasarkan ID.
 * @param {number} id - ID audiens.
 * @returns {Promise<string>} Pesan dari API.
 */
async function deleteAudienceById({ id }) {
  const responseJson = await fetchWithAuth(`/audiences/${id}`, {
    method: 'DELETE',
  });
  return responseJson.message;
}

/**
 * Memperbarui data audiens berdasarkan ID.
 * @param {number} id - ID audiens.
 * @param {object} payload - Objek yang berisi data yang diperbarui.
 * @returns {Promise<object>} Data audiens yang diperbarui.
 */
async function updateAudienceById({ id, payload }) {
  const responseJson = await fetchWithAuth(`/audiences/${id}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

export {
  addAudience,
  getAudienceById,
  getAudiences,
  deleteAudienceById,
  updateAudienceById,
};
