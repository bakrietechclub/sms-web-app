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
  deleteInstitutionsById,
  updateInstitutionsById,
};
