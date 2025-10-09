/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

/**
 * Menambahkan data SPK baru.
 * @param {object} payload - Objek yang berisi data SPK.
 * @returns {Promise<object>} Data SPK yang baru ditambahkan.
 */
async function addSpk(payload) {
  const responseJson = await fetchWithAuth('/partnerships/spk', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

/**
 * Mengambil data SPK berdasarkan ID.
 * @param {number} id - ID SPK.
 * @returns {Promise<object>} Data SPK.
 */
async function getSpkById({ id }) {
  const responseJson = await fetchWithAuth(`/partnerships/spk/${id}`);
  return responseJson.data;
}

/**
 * Mengambil semua data SPK.
 * @returns {Promise<array>} Array data SPK.
 */
async function getSpk({ q, typeId, page = 1, pageSize = 10 }) {
  const responseJson = await fetchWithAuth(
    `/partnerships/spk?q=${q}&typeId=${typeId}&page=${page}&pageSize=${pageSize}`
  );
  return responseJson.data;
}

/**
 * Menghapus data SPK berdasarkan ID.
 * @param {number} id - ID SPK.
 * @returns {Promise<string>} Pesan dari API.
 */
async function deleteSpkById({ id }) {
  const responseJson = await fetchWithAuth(`/partnerships/spk/${id}`, {
    method: 'DELETE',
  });
  return responseJson.message;
}

/**
 * Memperbarui data SPK berdasarkan ID.
 * @param {number} id - ID SPK.
 * @param {object} payload - Objek yang berisi data yang diperbarui.
 * @returns {Promise<object>} Data SPK yang diperbarui.
 */
async function updateSpkById({ id, payload }) {
  const responseJson = await fetchWithAuth(`/partnerships/spk/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

export { addSpk, getSpkById, getSpk, deleteSpkById, updateSpkById };
