/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

/**
 * Menambahkan kontak baru ke dalam grup.
 * @param {string} groupId - ID grup.
 * @param {object} payload - Objek yang berisi data kontak.
 * @returns {Promise<object>} Data kontak yang baru ditambahkan.
 */
async function addContact({ groupId, ...payload }) {
  const responseJson = await fetchWithAuth(`/groups/${groupId}/contact`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return responseJson.data;
}

async function getContactByGroupId({ groupId }) {
  const responseJson = await fetchWithAuth(`/groups/${groupId}/contact`);
  return responseJson.data;
}

/**
 * Mengambil kontak berdasarkan ID grup dan ID kontak.
 * @param {string} groupId - ID grup.
 * @param {string} contactId - ID kontak.
 * @returns {Promise<object>} Data kontak.
 */

async function getContactById({ groupId, contactId }) {
  const responseJson = await fetchWithAuth(
    `/groups/${groupId}/contact/${contactId}`
  );
  return responseJson.data;
}

/**
 * Menghapus kontak berdasarkan ID grup dan ID kontak.
 * @param {string} groupsId - ID grup.
 * @param {string} contactId - ID kontak.
 * @returns {Promise<string>} Pesan dari API.
 */
async function deleteContactById({ groupsId, contactId }) {
  const responseJson = await fetchWithAuth(
    `/groups/${groupsId}/contact/${contactId}`,
    {
      method: 'DELETE',
    }
  );
  return responseJson.message;
}

/**
 * Memperbarui kontak berdasarkan ID grup dan ID kontak.
 * @param {string} groupId - ID grup.
 * @param {string} contactId - ID kontak.
 * @param {object} payload - Objek yang berisi data yang diperbarui.
 * @returns {Promise<object>} Data kontak yang diperbarui.
 */
async function updateContactById({ groupId, contactId, payload }) {
  const responseJson = await fetchWithAuth(
    `/groups/${groupId}/contact/${contactId}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    }
  );
  return responseJson.data;
}

export {
  addContact,
  getContactByGroupId,
  getContactById,
  deleteContactById,
  updateContactById,
};
