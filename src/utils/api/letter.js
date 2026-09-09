import { fetchWithAuth, buildQueryString } from './client/apiClient';

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

async function getLetter({ q = '', page = 1, pageSize = 10 } = {}) {
  const responseJson = await fetchWithAuth(
    `/letter-numbers${buildQueryString({ q, page, pageSize })}`,
  );
  return responseJson.data;
}

async function getLastLetterNumber() {
  const responseJson = await fetchWithAuth('/letter-numbers/last-number');
  return responseJson.data;
}

/**
 * Nomor surat yang belum ditautkan ke dokumen mana pun -- dipakai dropdown
 * "pilih nomor surat" di form Tambah MoU/PKS/IA/SPK (LetterNumberPickerField).
 */
async function getAvailableLetterNumbers({ typeId } = {}) {
  const responseJson = await fetchWithAuth(
    `/letter-numbers/available${buildQueryString({ typeId })}`,
  );
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

// --- Konfigurasi kaunter global (letter_number_sequence) ------------------
// PENTING: kaunter ini dibagi dengan CLP (back-end) -- lihat catatan di
// MasterPartnershipLetterNumberRepositoryMySQL (back-end-sms). Endpoint ini
// sengaja dipisah dari CRUD nomor surat biasa dan butuh permission
// tersendiri (sms.letter_numbers.configure_sequence).

async function getLetterSequence() {
  const responseJson = await fetchWithAuth('/letter-numbers/sequence');
  return responseJson.data;
}

async function updateLetterSequence({ newValue, reason }) {
  const responseJson = await fetchWithAuth('/letter-numbers/sequence', {
    method: 'PUT',
    body: JSON.stringify({ newValue, reason }),
  });
  return responseJson;
}

async function getLetterSequenceAuditLog({ page = 1, pageSize = 20 } = {}) {
  const responseJson = await fetchWithAuth(
    `/letter-numbers/sequence/audit-log${buildQueryString({ page, pageSize })}`,
  );
  return responseJson.data;
}

export {
  addLetter,
  getLetterById,
  getLetter,
  getLastLetterNumber,
  getAvailableLetterNumbers,
  getSubClassifications,
  deleteLetterById,
  updateLetterById,
  getLetterSequence,
  updateLetterSequence,
  getLetterSequenceAuditLog,
};
