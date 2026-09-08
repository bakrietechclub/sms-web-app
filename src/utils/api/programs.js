/* istanbul ignore file */

import { fetchWithAuth } from './client/apiClient';

/**
 * Daftar Second Tier Program (LEAD, CLP, HOL, dst) dari `md_second_tier_program`.
 * `isProgram=1` -> hanya program sungguhan yang bisa diikuti mitra (dipakai
 * "Program LSD" di form Riset Potensial/Mitra). Tanpa parameter -> semua
 * baris, termasuk label payung seperti BCF (dipakai form Penomoran Surat,
 * karena satu surat sah ditujukan atas nama BCF tanpa terikat satu program).
 * @param {{ isProgram?: 0 | 1 }} [params]
 */
async function getPrograms({ isProgram } = {}) {
  const query = isProgram === undefined ? '' : `?isProgram=${isProgram}`;
  const responseJson = await fetchWithAuth(`/programs${query}`);
  return responseJson.data;
}

export { getPrograms };
