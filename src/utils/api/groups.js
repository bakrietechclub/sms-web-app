/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

/**
 * Menambahkan data grup baru.
 * @param {object} payload - Objek yang berisi data grup.
 * @returns {Promise<object>} Data grup yang baru ditambahkan.
 */
async function addGroup(payload) {
  const responseJson = await fetchWithAuth('/groups', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

/**
 * Mengambil data grup berdasarkan ID.
 * @param {number} id - ID grup.
 * @returns {Promise<object>} Data grup.
 */
async function getGroupById({ id }) {
  const responseJson = await fetchWithAuth(`/groups/${id}`);
  return responseJson.data;
}

/**
 * Mengambil semua data grup.
 * @returns {Promise<array>} Array data grup.
 */
async function getGroups({ q = '', typeId, page = 1, pageSize = 10 }) {
  const responseJson = await fetchWithAuth(
    `/groups?q=${q}&typeId=${typeId}&page=${page}&pageSize=${pageSize}`
  );
  return responseJson.data;
}

/**
 * Menghapus data grup berdasarkan ID.
 * @param {number} id - ID grup.
 * @returns {Promise<string>} Pesan dari API.
 */
async function deleteGroupById({ id }) {
  const responseJson = await fetchWithAuth(`/groups/${id}`, {
    method: 'DELETE',
  });
  return responseJson.message;
}

/**
 * Memperbarui data grup berdasarkan ID.
 * @param {number} id - ID grup.
 * @param {object} payload - Objek yang berisi data yang diperbarui.
 * @returns {Promise<object>} Data grup yang diperbarui.
 */
async function updateGroupById({ id, ...payload }) {
  const responseJson = await fetchWithAuth(`/groups/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

export { addGroup, getGroupById, getGroups, deleteGroupById, updateGroupById };
