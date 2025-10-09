import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FreezeTable } from '../../../fragments/Table';
import { Pagination } from '../../../fragments/Pagination';
import { TableToolbar } from '../../../fragments/TableToolbar';

import { AddModalTorUniv } from '../../../fragments/modalforms/univ/AddModalTorUniv';
import { AddModalTorINGO } from '../../../fragments/modalforms/ingo/AddModalTorINGO';
import { useNavigate } from 'react-router-dom';
import { asyncGetTor } from '../../../../states/features/partnerships/tor/torThunks';
import { selectAllTors } from '../../../../states/features/partnerships/tor/torSelectors';
import {
  selectAccessRole,
  selectAccessTypeInstitutionsId,
} from '../../../../states/features/auth/authSelectors';
import { Button } from '../../../elements/Button';
import { getFiltersByModuleAndRole } from '../../../../utils/filterOptions';
import AddTorModal from '../../../fragments/AddTorModal';

export const Tor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetTor());
  }, [dispatch]);

  const data = useSelector(selectAllTors);
  const accessRole = useSelector(selectAccessRole);
  const accessTypeId = useSelector(selectAccessTypeInstitutionsId);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterOptions = getFiltersByModuleAndRole('tor', accessRole);

  const headers = [
    'No.',
    'Nama Instansi',
    'Jenis Instansi',
    'Divisi Instansi',
    'Tanggal Tanda Tangan',
    'Jangka Kerjasama',
    'Jatuh Tempo',
    'Aksi',
  ];

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td className="border-b border-gray-200">{value.instituteName || '-'}</td>
      <td className="border-b border-gray-200">
        {value.instituteTypeName || '-'}
      </td>
      <td className="border-b border-gray-200">
        {value.institutionDivision || '-'}
      </td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200">{value.torSignatureDate}</td>
      <td className="border-b border-gray-200">{value.torTimePeriod}</td>
      <td className="border-b border-gray-200">{value.torDueDate}</td>
      <td className="px-5 border-b border-gray-200">
        <Button
          onClick={() => {
            navigate(`/dashboard/partnerships/tor/${value.torId}`);
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
      <h1 className="text-2xl font-semibold">Tabel Surat TOR</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
        filters={filterOptions}
        onFilterSet={(f) => setFilters(f)}
        searchWidth="w-1/4"
      />

      <FreezeTable
        headers={headers}
        data={data}
        renderRow={renderRow}
        renderRowFreeze={renderRowFreeze}
        freezeCol={4}
      />
      <Pagination />

      {/* Modal Tambah */}
      {isModalOpen && (
        <AddTorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          accessTypeId={accessTypeId}
        />
      )}
    </div>
  );
};
