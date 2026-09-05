import { ExternalLink, Eye } from 'lucide-react';
import { Button } from '../../elements/Button';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Table } from '../../fragments/Table';
import { useEffect, useState } from 'react';
import { Pagination } from '../../fragments/Pagination';
import { useDispatch, useSelector } from 'react-redux';

// Import modal untuk setiap jenis stakeholder
import { useNavigate } from 'react-router-dom';
import { selectAccessRole } from '../../../states/features/auth/authSelectors';
import { asyncGetLetters } from '../../../states/features/letter/letterThunks';
import {
  selectAllLetters,
  selectLetterLoading,
  selectLetterMeta,
} from '../../../states/features/letter/letterSelectors';
import { getFiltersByModuleAndRole } from '../../../utils/filterOptions';
import AddModalLetterNumbering from '../../fragments/AddModalLetterNumbering';
import { usePermission } from '../../../hooks/usePermission';
import { PERM } from '../../../constants/permissions';

// "Template Surat" -> tautan langsung ke halaman detail dokumen yang
// benar-benar memakai nomor surat ini (lihat GetLetterNumber entity di
// back-end-sms: document_type/document_id dari JOIN ke tx_ps_mou/pks/ia/spk).
// TOR sengaja tidak ada di sini -- TOR tidak pernah punya nomor surat
// sendiri (tidak ada kolom id_partnership_letter_numbers di tabelnya).
const DOCUMENT_TYPE_PATH = {
  mou: '/partnerships/mou',
  pks: '/partnerships/pks',
  ia: '/partnerships/implementation-agreements',
  spk: '/partnerships/spk',
};

const DOCUMENT_TYPE_LABEL = {
  mou: 'MoU',
  pks: 'PKS',
  ia: 'IA',
  spk: 'SPK',
};

export const LetterNumbering = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { can } = usePermission();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(asyncGetLetters({ query: search, page: currentPage }));
  }, [dispatch, search, currentPage]);

  // Ganti kata kunci pencarian -> kembali ke halaman 1, supaya tidak
  // "nyangkut" di halaman terakhir hasil pencarian sebelumnya yang mungkin
  // sudah tidak ada lagi untuk kata kunci yang baru.
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const data = useSelector(selectAllLetters);
  const loading = useSelector(selectLetterLoading);
  const meta = useSelector(selectLetterMeta);

  const accessRole = useSelector(selectAccessRole);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterOptions = getFiltersByModuleAndRole('letter', accessRole);

  // Fungsi render baris tabel utama
  const renderRow = (value, index) => {
    const documentPath = DOCUMENT_TYPE_PATH[value.documentType];
    const hasReference = documentPath && value.documentId;

    return (
      <tr
        key={index}
        className='border-b border-[#E7EDF4] h-14'
      >
        <td className='px-4 py-3 border-b border-gray-200'>
          {(currentPage - 1) * (meta?.limit || 10) + index + 1}
        </td>
        <td
          className='px-4 py-3 max-w-3 truncate border-b border-gray-200'
          title={value.letterNumberType}
        >
          {value.letterNumberType}
        </td>
        <td
          className='px-4 py-3 max-w-3 truncate border-b border-gray-200'
          title={value.letterReferenceNumber}
        >
          {value.letterReferenceNumber}
        </td>
        <td
          className='px-4 py-3 border-b border-gray-200'
          title={value.letterSubject}
        >
          {value.letterSubject === '' ? '-' : value.letterSubject}
        </td>
        <td className='px-4 py-3 border-b border-gray-200'>
          {hasReference ? (
            <button
              type='button'
              onClick={() => navigate(`${documentPath}/${value.documentId}`)}
              title={`Buka ${DOCUMENT_TYPE_LABEL[value.documentType]} sumber nomor surat ini`}
              className='inline-flex items-center gap-1 rounded-full bg-[#F5F9FF] text-[#0D4690] text-xs font-semibold pl-2.5 pr-2 py-1 hover:bg-[#E7EDF4] cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0D4690]'
            >
              {DOCUMENT_TYPE_LABEL[value.documentType]}
              <ExternalLink size={12} />
            </button>
          ) : (
            <span
              className='text-xs text-gray-400'
              title='Nomor surat ini belum ditautkan ke dokumen manapun'
            >
              Belum ditautkan
            </span>
          )}
        </td>
        <td className='px-4 py-3 border-b border-gray-200'>
          <Button
            onClick={() => {
              navigate(`/letter-numbers/${value.letterNumberId}`);
            }}
            className='inline-flex items-center justify-center p-2 rounded-md text-[#0D4690] hover:bg-[#F5F9FF] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D4690]'
            aria-label='Lihat Detail'
            title='Lihat Detail'
          >
            <Eye className='w-4 h-4' />
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h1 className='text-2xl font-semibold'>Tabel Penomoran Surat</h1>
      <p className='text-sm text-gray-500 mt-1 mb-4'>
        Nomor surat resmi yang diterbitkan untuk setiap dokumen kerja sama,
        dibuat otomatis berdasarkan klasifikasi, jenis surat, dan program
        yang dipilih.
      </p>

      {/* TableToolbar untuk pencarian dan filter */}
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
        canCreate={can(PERM.LETTER_NUMBERS_CREATE)}
        filters={filterOptions} // Menggunakan filter yang sama untuk semua stakeholder
        onFilterSet={() => console.log('Filter diset')}
        searchWidth='w-1/4'
      />

      <div>
        {/* Tabel dengan FreezeTable */}
        <Table
          headers={[
            'No',
            'Jenis Surat',
            'Nomor Surat',
            'Tujuan dan Perihal',
            'Referensi Surat',
            'Aksi',
          ]}
          data={data}
          renderRow={renderRow}
          isLoading={loading}
        />
      </div>

      {/* Pagination — currentPage pakai state lokal (bukan meta.page dari
          server) supaya highlight halaman aktif langsung berubah saat
          diklik, tidak menunggu round-trip request selesai */}
      <Pagination
        currentPage={currentPage}
        totalPages={meta?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Modal berdasarkan stakeholder yang dipilih */}
      {isModalOpen && (
        <AddModalLetterNumbering
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={(value) => console.log(value)}
          isInheritance={false}
        />
      )}
    </div>
  );
};
