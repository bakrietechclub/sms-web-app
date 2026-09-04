/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

async function addInstitutions(payload) {
  const responseJson = await fetchWithAuth('/institutions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

async function getInstitutionsById({ id }) {
  const responseJson = await fetchWithAuth(`/institutions/${id}`);
  return responseJson.data;
}

async function getInstitutions() {
  const responseJson = await fetchWithAuth('/institutions');
  return responseJson.data;
}

async function getInstitutionsOptions({ q, typeId }) {
  const responseJson = await fetchWithAuth(
    `/institutions-options?q=${q}&typeId=${typeId}`
  );
  return responseJson.data;
}

async function getInstitutionsOptionsById({ id }) {
  const responseJson = await fetchWithAuth(`/institutions-options/${id}`);
  return responseJson.data;
}

/**
 * Jumlah institusi per jenis (Universitas, Pemerintah, dst), dibatasi ke
 * Divisi yang diakses employee ini. Dipakai untuk widget Hexahelix
 * Stakeholder di halaman /home.
 * @returns {Promise<Array<{typeId: number, typeName: string, total: number}>>}
 */
async function getInstitutionsStats() {
  const responseJson = await fetchWithAuth('/institutions-stats');
  return responseJson.data;
}

async function deleteInstitutionsById({ id }) {
  const responseJson = await fetchWithAuth(`/institutions/${id}`, {
    method: 'DELETE',
  });
  return responseJson.message;
}

async function updateInstitutionsById({ id, payload }) {
  const responseJson = await fetchWithAuth(`/institutions/${id}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

export {
  addInstitutions,
  getInstitutionsById,
  getInstitutions,
  getInstitutionsOptions,
  getInstitutionsOptionsById,
  getInstitutionsStats,
  deleteInstitutionsById,
  updateInstitutionsById,
};
