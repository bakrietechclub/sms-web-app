/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

/**
 * Mengambil jejaring dokumen legalitas kerjasama (MoU -> PKS -> IA/TOR ->
 * SPK) dimulai dari dokumen manapun -- dipakai tombol "Jejaring Surat" di
 * setiap halaman detail (MoU/PKS/IA/TOR/SPK).
 * @param {'mou'|'pks'|'ia'|'tor'|'spk'} type - Jenis dokumen asal.
 * @param {number} id - ID dokumen asal.
 * @returns {Promise<{nodes: Array, edges: Array, focusId: string|null}>}
 */
async function getPartnershipNetwork({ type, id }) {
  const responseJson = await fetchWithAuth(
    `/partnerships/network/${type}/${id}`,
  );
  return responseJson.data;
}

export { getPartnershipNetwork };
