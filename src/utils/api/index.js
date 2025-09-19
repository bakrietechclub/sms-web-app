/* istanbul ignore file */

// Impor semua fungsionalitas dari modul yang terpisah
import * as auth from './auth';
import * as research from './research';
import * as audiences from './audiences';
import * as groups from './groups';
import * as groupContacts from './groupContacts';
import * as mou from './mou';
import * as pks from './pks';
import * as ia from './ia';
import * as tor from './tor';
import * as spk from './spk';
// Anda dapat menambahkan modul lain di sini

// Gabungkan semua fungsionalitas ke dalam satu objek API tunggal
const api = {
  // USER (AUTH)
  ...auth,
  // RESEARCH
  ...research,
  // AUDIENCES
  ...audiences,
  // GROUPS
  ...groups,
  // GROUP CONTACTS
  ...groupContacts,
  // MOU
  ...mou,
  // PKS, IA, TOR, SPK, dll. akan ditambahkan di sini
  ...pks,
  ...ia,
  ...tor,
  ...spk,
};

export default api;
