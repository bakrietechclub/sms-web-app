/**
 * Menurunkan query param `typeId` dari filter "Jenis Instansi" yang dicentang
 * user (lihat TableToolbar). Kalau tidak ada opsi yang dicentang, pakai
 * `defaultTypeIds` (typeId hasil scoping divisi) supaya backend tetap
 * menerapkan data-scoping RBAC seperti biasa.
 *
 * @param {Record<string, Array<string|number>>} activeFilters
 * @param {Array<number>|null} defaultTypeIds
 * @returns {string|number[]|null}
 */
export function resolveTypeIdParam(activeFilters, defaultTypeIds) {
  const selected = activeFilters?.['Jenis Instansi'];
  return selected?.length ? selected.join(',') : defaultTypeIds;
}

/**
 * Menggabungkan value-value yang dicentang di satu grup filter (selain
 * "Jenis Instansi") jadi string comma-separated siap kirim sebagai query
 * param backend, atau `undefined` kalau grup itu tidak difilter -- backend
 * memakai `undefined` sebagai sinyal untuk melewati WHERE clause-nya.
 *
 * @param {Record<string, Array<string|number>>} activeFilters
 * @param {string} filterLabel
 * @returns {string|undefined}
 */
export function resolveFilterParam(activeFilters, filterLabel) {
  const selected = activeFilters?.[filterLabel];
  return selected?.length ? selected.join(',') : undefined;
}
