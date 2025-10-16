/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

async function addResearchCollab(payload) {
  const responseJson = await fetchWithAuth(`/research/collab`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

async function getResearchCollab({ q, typeId, page = 1, pageSize = 10 }) {
  const responseJson = await fetchWithAuth(
    `/research/collab?q=${q}&typeId=${typeId}&page=${page}&pageSize=${pageSize}`
  );
  return responseJson.data;
}

async function getResearchCollabOptions({ q, typeId }) {
  const responseJson = await fetchWithAuth(
    `/research/collab-options?q=${q}&typeId=${typeId}`
  );
  return responseJson.data;
}

async function getResearchCollabById({ id }) {
  const responseJson = await fetchWithAuth(`/research/collab/${id}`);
  return responseJson.data;
}

async function updateResearchCollabById({ id, ...payload }) {
  const responseJson = await fetchWithAuth(`/research/collab/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

async function deleteResearchCollabById({ id }) {
  const responseJson = await fetchWithAuth(`/research/collab/${id}`, {
    method: 'DELETE',
  });
  return responseJson.message;
}

export {
  addResearchCollab,
  getResearchCollab,
  getResearchCollabOptions,
  getResearchCollabById,
  updateResearchCollabById,
  deleteResearchCollabById,
};
