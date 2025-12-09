import { Download } from 'lucide-react';
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
import { selectAllLetters, selectLetterLoading } from '../../../states/features/letter/letterSelectors';
import { getFiltersByModuleAndRole } from '../../../utils/filterOptions';
import AddModalLetterNumbering from '../../fragments/AddModalLetterNumbering';

export const LetterNumbering = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLetters());
  }, [dispatch]);

  const data = useSelector(selectAllLetters);
  const loading = useSelector(selectLetterLoading);

  const accessRole = useSelector(selectAccessRole);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterOptions = getFiltersByModuleAndRole('letter', accessRole);

  // Tentukan data berdasarkan stakeholder

  // Fungsi render baris tabel yang dibekukan (freeze)
  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.jenis}</td>
      <td className="border-b border-gray-200">{value.division}</td>
    </tr>
  );

  // Fungsi render baris tabel utama
  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td
        className="p-3 max-w-3 truncate border-b border-gray-200"
        title={value.letterNumberType}
      >
        {value.letterNumberType}
      </td>
      <td
        className="p-3 max-w-3 truncate border-b border-gray-200"
        title={value.letterReferenceNumber}
      >
        {value.letterReferenceNumber}
      </td>
      <td className="border-b border-gray-200" title={value.letterSubject}>
        {value.letterSubject}
      </td>
      <td className="mt-2 px-4 border-b border-gray-200">
        <Button
          className="flex items-center justify-center w-28 h-8 bg-[#e89229] text-[#f1f1f1] rounded-md p-auto px-4 hover:bg-[#d18325] cursor-pointer"
          onClick={() => alert('Download Template Surat')}
        >
          <Download className="mr-2" />
          Unduh
        </Button>
      </td>
      <td>
        <Button
          onClick={() => {
            navigate(`/dashboard/letter-numbers/${value.letterNumberId}`);
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Penomoran Surat</h1>

      {/* TableToolbar untuk pencarian dan filter */}
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
        filters={filterOptions} // Menggunakan filter yang sama untuk semua stakeholder
        onFilterSet={() => console.log('Filter diset')}
        searchWidth="w-1/4"
      />

      <div>
        {/* Tabel dengan FreezeTable */}
        <Table
          headers={[
            'No',
            'Jenis Surat',
            'Nomor Surat',
            'Tujuan dan Perihal',
            'Template Surat',
            'Aksi',
          ]}
          data={data}
          renderRow={renderRow}
          isLoading={loading}
        />
      </div>

      {/* Pagination */}
      <Pagination />

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
