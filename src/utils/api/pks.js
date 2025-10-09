/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

/**
 * Menambahkan data PKS baru.
 * @param {object} payload - Objek yang berisi data PKS.
 * @returns {Promise<object>} Data PKS yang baru ditambahkan.
 */
async function addPks(payload) {
  const responseJson = await fetchWithAuth('/partnerships/pks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

/**
 * Mengambil data PKS berdasarkan ID.
 * @param {number} id - ID PKS.
 * @returns {Promise<object>} Data PKS.
 */
async function getPksById({ id }) {
  const responseJson = await fetchWithAuth(`/partnerships/pks/${id}`);
  return responseJson.data;
}

/**
 * Mengambil semua data PKS.
 * @returns {Promise<array>} Array data PKS.
 */
async function getPks() {
  const responseJson = await fetchWithAuth('/partnerships/pks');
  return responseJson.data;
}

async function getPksOptions({ q, typeId }) {
  const responseJson = await fetchWithAuth(
    `/partnerships/pks-options?q=${q}&typeId=${typeId}`
  );
  return responseJson.data;
}

/**
 * Menghapus data PKS berdasarkan ID.
 * @param {number} id - ID PKS.
 * @returns {Promise<string>} Pesan dari API.
 */
async function deletePksById({ id }) {
  const responseJson = await fetchWithAuth(`/partnerships/pks/${id}`, {
    method: 'DELETE',
  });
  return responseJson.message;
}

/**
 * Memperbarui data PKS berdasarkan ID.
 * @param {number} id - ID PKS.
 * @param {object} payload - Objek yang berisi data yang diperbarui.
 * @returns {Promise<object>} Data PKS yang diperbarui.
 */
async function updatePksById({ id, payload }) {
  const responseJson = await fetchWithAuth(`/partnerships/pks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

export {
  addPks,
  getPksById,
  getPks,
  getPksOptions,
  deletePksById,
  updatePksById,
};
