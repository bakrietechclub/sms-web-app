/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

/**
 * Menambahkan data MOU baru.
 * @param {object} payload - Objek yang berisi data MOU.
 * @returns {Promise<object>} Data MOU yang baru ditambahkan.
 */
async function addMou(payload) {
  const responseJson = await fetchWithAuth('/partnerships/mou', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

/**
 * Mengambil data MOU berdasarkan ID.
 * @param {number} id - ID MOU.
 * @returns {Promise<object>} Data MOU.
 */
async function getMouById({ id }) {
  const responseJson = await fetchWithAuth(`/partnerships/mou/${id}`);
  return responseJson.data;
}

/**
 * Mengambil semua data MOU.
 * @returns {Promise<array>} Array data MOU.
 */
async function getMou() {
  const responseJson = await fetchWithAuth('/partnerships/mou');
  return responseJson.data;
}

async function getMouOptions({ q }) {
  const responseJson = await fetchWithAuth(`/partnerships/mou-options?q=${q}`);
  return responseJson.data;
}

/**
 * Menghapus data MOU berdasarkan ID.
 * @param {number} id - ID MOU.
 * @returns {Promise<string>} Pesan dari API.
 */
async function deleteMouById({ id }) {
  const responseJson = await fetchWithAuth(`/partnerships/mou/${id}`, {
    method: 'DELETE',
  });
  return responseJson.message;
}

/**
 * Memperbarui data MOU berdasarkan ID.
 * @param {number} id - ID MOU.
 * @param {object} payload - Objek yang berisi data yang diperbarui.
 * @returns {Promise<object>} Data MOU yang diperbarui.
 */
async function updateMouById({ id, payload }) {
  const responseJson = await fetchWithAuth(`/partnerships/mou/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

export {
  addMou,
  getMouById,
  getMou,
  getMouOptions,
  deleteMouById,
  updateMouById,
};
