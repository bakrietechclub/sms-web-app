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

async function getLetter() {
  const responseJson = await fetchWithAuth('/letter-numbers');
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
  deleteLetterById,
  updateLetterById,
};
