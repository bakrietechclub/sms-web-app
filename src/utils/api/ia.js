/* istanbul ignore file */

import { fetchWithAuth, buildQueryString } from './client/apiClient';

/**
 * Menambahkan data IA baru.
 * @param {object} payload - Objek yang berisi data IA.
 * @returns {Promise<object>} Data IA yang baru ditambahkan.
 */
async function addImplementationAgreement(payload) {
  const responseJson = await fetchWithAuth(
    '/partnerships/implementation-agreements',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
  return responseJson.data;
}

/**
 * Mengambil data IA berdasarkan ID.
 * @param {number} id - ID IA.
 * @returns {Promise<object>} Data IA.
 */
async function getImplementationAgreementById({ id }) {
  const responseJson = await fetchWithAuth(
    `/partnerships/implementation-agreements/${id}`
  );
  return responseJson.data;
}

/**
 * Mengambil semua data IA.
 * @returns {Promise<array>} Array data IA.
 */
async function getImplementationAgreements({
  q = '',
  typeId,
  page = 1,
  pageSize = 10,
}) {
  const responseJson = await fetchWithAuth(
    `/partnerships/implementation-agreements${buildQueryString({ q, typeId, page, pageSize })}`,
  );
  return responseJson.data;
}

async function getImplementationAgreementsOptions({ q, typeId }) {
  const responseJson = await fetchWithAuth(
    `/partnerships/implementation-agreements-options?q=${q}&typeId=${typeId}`
  );
  return responseJson.data;
}

/**
 * Menghapus data IA berdasarkan ID.
 * @param {number} id - ID IA.
 * @returns {Promise<string>} Pesan dari API.
 */
async function deleteImplementationAgreementById({ id }) {
  const responseJson = await fetchWithAuth(
    `/partnerships/implementation-agreements/${id}`,
    {
      method: 'DELETE',
    }
  );
  return responseJson.message;
}

/**
 * Memperbarui data IA berdasarkan ID.
 * @param {number} id - ID IA.
 * @param {object} payload - Objek yang berisi data yang diperbarui.
 * @returns {Promise<object>} Data IA yang diperbarui.
 */
async function updateImplementationAgreementById({ id, payload }) {
  const responseJson = await fetchWithAuth(
    `/partnerships/implementation-agreements/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    }
  );
  return responseJson.data;
}

/**
 * Mengambil opsi "Batch Program" untuk form IA, satu dropdown gabungan
 * Program+Batch dikelompokkan per Program (mis. "Campus Leaders Program -
 * Batch 8" berisi "Internship MSIB Reguler - Batch 8", "Internship Mandiri
 * - Batch 8", dst) -- sesuai pola BatchSelector di web-app-clp, hanya saja
 * datanya sekaligus dalam satu response (tidak perlu pilih Program dulu).
 * @returns {Promise<Array<{mainProgramName, mainBatchName, subBatches}>>}
 */
async function getIABatchOptions() {
  const responseJson = await fetchWithAuth(
    '/partnerships/implementation-agreements-batches',
  );
  return responseJson.data;
}

export {
  addImplementationAgreement,
  getImplementationAgreements,
  getImplementationAgreementsOptions,
  getImplementationAgreementById,
  deleteImplementationAgreementById,
  updateImplementationAgreementById,
  getIABatchOptions,
};
