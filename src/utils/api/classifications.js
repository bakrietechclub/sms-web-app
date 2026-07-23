import { fetchWithAuth } from './client/apiClient';

// --- Klasifikasi (ADM/FIN) ---

async function getClassifications() {
  const responseJson = await fetchWithAuth('/letter-numbers/master/classifications');
  return responseJson.data;
}

async function addClassification(payload) {
  const responseJson = await fetchWithAuth('/letter-numbers/master/classifications', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

async function updateClassificationById({ id, payload }) {
  const responseJson = await fetchWithAuth(
    `/letter-numbers/master/classifications/${id}`,
    { method: 'PUT', body: JSON.stringify(payload) },
  );
  return responseJson.message;
}

async function deleteClassificationById({ id }) {
  const responseJson = await fetchWithAuth(
    `/letter-numbers/master/classifications/${id}`,
    { method: 'DELETE' },
  );
  return responseJson.message;
}

// --- Sub-Klasifikasi ---

async function getSubClassificationsList() {
  const responseJson = await fetchWithAuth('/letter-numbers/master/sub-classifications');
  return responseJson.data;
}

async function addSubClassification(payload) {
  const responseJson = await fetchWithAuth('/letter-numbers/master/sub-classifications', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

async function updateSubClassificationById({ id, payload }) {
  const responseJson = await fetchWithAuth(
    `/letter-numbers/master/sub-classifications/${id}`,
    { method: 'PUT', body: JSON.stringify(payload) },
  );
  return responseJson.message;
}

async function deleteSubClassificationById({ id }) {
  const responseJson = await fetchWithAuth(
    `/letter-numbers/master/sub-classifications/${id}`,
    { method: 'DELETE' },
  );
  return responseJson.message;
}

// --- Jenis Surat ---

async function getLetterTypes() {
  const responseJson = await fetchWithAuth('/letter-numbers/master/types');
  return responseJson.data;
}

async function addLetterType(payload) {
  const responseJson = await fetchWithAuth('/letter-numbers/master/types', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

async function updateLetterTypeById({ id, payload }) {
  const responseJson = await fetchWithAuth(`/letter-numbers/master/types/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return responseJson.message;
}

async function deleteLetterTypeById({ id }) {
  const responseJson = await fetchWithAuth(`/letter-numbers/master/types/${id}`, {
    method: 'DELETE',
  });
  return responseJson.message;
}

export {
  getClassifications,
  addClassification,
  updateClassificationById,
  deleteClassificationById,
  getSubClassificationsList,
  addSubClassification,
  updateSubClassificationById,
  deleteSubClassificationById,
  getLetterTypes,
  addLetterType,
  updateLetterTypeById,
  deleteLetterTypeById,
};
