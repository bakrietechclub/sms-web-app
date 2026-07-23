import { fetchWithAuth } from './client/apiClient';

async function addLetter(payload) {
  const responseJson = await fetchWithAuth('/letter-numbers', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

async function getLetterById({ id }) {
  const responseJson = await fetchWithAuth(`/letter-numbers/${id}`);
  return responseJson.data;
}

async function getLetter({ page = 1, pageSize = 10 } = {}) {
  const responseJson = await fetchWithAuth(
    `/letter-numbers?page=${page}&pageSize=${pageSize}`,
  );
  return responseJson.data;
}

async function getLastLetterNumber() {
  const responseJson = await fetchWithAuth('/letter-numbers/last-number');
  return responseJson.data;
}

async function getSubClassifications({ id }) {
  const responseJson = await fetchWithAuth(
    `/letter-numbers/classifications/${id}`
  );
  return responseJson.data;
}

async function deleteLetterById({ id }) {
  const responseJson = await fetchWithAuth(`/letter-numbers/${id}`, {
    method: 'DELETE',
  });
  return responseJson.message;
}

async function updateLetterById({ id, payload }) {
  const responseJson = await fetchWithAuth(`/letter-numbers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

export {
  addLetter,
  getLetterById,
  getLetter,
  getLastLetterNumber,
  getSubClassifications,
  deleteLetterById,
  updateLetterById,
};
