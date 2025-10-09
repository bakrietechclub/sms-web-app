/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

/**
 * Menambahkan data potensi riset baru.
 * @param {object} payload - Objek yang berisi semua data riset.
 * @returns {Promise<object>} Data riset yang baru ditambahkan.
 */
async function addResearchPotential(payload) {
  const responseJson = await fetchWithAuth(`/research/potential`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

/**
 * Mengambil semua data potensi riset.
 * @returns {Promise<array>} Array data potensi riset.
 */
async function getResearchPotential({ q, typeId, page = 1, pageSize = 10 }) {
  const responseJson = await fetchWithAuth(
    `/research/potential?q=${q}&typeId=${typeId}&page=${page}&pageSize=${pageSize}`
  );
  return responseJson.data;
}

async function getResearchPotentialOptions({ q, typeId }) {
  const responseJson = await fetchWithAuth(
    `/research/potential-options?q=${q}&typeId=${typeId}`
  );
  return responseJson.data;
}

/**
 * Mengambil potensi riset berdasarkan ID.
 * @param {number} id - ID potensi riset.
 * @returns {Promise<object>} Data potensi riset.
 */
async function getResearchPotentialById({ id }) {
  const responseJson = await fetchWithAuth(`/research/potential/${id}`);
  return responseJson.data;
}

/**
 * Memperbarui potensi riset berdasarkan ID.
 * @param {number} id - ID potensi riset.
 * @param {object} payload - Objek yang berisi data yang diperbarui.
 * @returns {Promise<object>} Data riset yang diperbarui.
 */
async function updateResearchPotentialById({ id, ...payload }) {
  const responseJson = await fetchWithAuth(`/research/potential/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

/**
 * Menghapus potensi riset berdasarkan ID.
 * @param {number} id - ID potensi riset.
 * @returns {Promise<string>} Pesan dari API.
 */
async function deleteResearchPotentialById({ id }) {
  const responseJson = await fetchWithAuth(`/research/potential/${id}`, {
    method: 'DELETE',
  });
  return responseJson.message;
}

export {
  addResearchPotential,
  getResearchPotential,
  getResearchPotentialOptions,
  getResearchPotentialById,
  updateResearchPotentialById,
  deleteResearchPotentialById,
};
