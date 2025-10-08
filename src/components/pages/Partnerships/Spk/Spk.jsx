import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FreezeTable } from '../../../fragments/Table';
import { Pagination } from '../../../fragments/Pagination';
import { TableToolbar } from '../../../fragments/TableToolbar';

import { AddModalSpkUniv } from '../../../fragments/modalforms/univ/AddModalSpkUniv';
import { AddModalSpkINGO } from '../../../fragments/modalforms/ingo/AddModalSpkINGO';

import { useNavigate } from 'react-router-dom';
import { asyncGetSpk } from '../../../../states/features/partnerships/spk/spkThunks';
import { selectAllSpk } from '../../../../states/features/partnerships/spk/spkSelectors';
import { selectAccessRole } from '../../../../states/features/auth/authSelectors';

import { getFiltersByModuleAndRole } from '../../../../utils/filterOptions.js';

import { Button } from '../../../elements/Button';
import AddSpkModal from '../../../fragments/AddSpkModal.jsx';

export const Spk = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetSpk());
  }, [dispatch]);

  const data = useSelector(selectAllSpk);
  const accessRole = useSelector(selectAccessRole);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterOptions = getFiltersByModuleAndRole('spk', accessRole);

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
      <td className="border-b border-gray-200">{value.instituteName}</td>
      <td className="border-b border-gray-200">{value.instituteTypeName}</td>
      <td className="border-b border-gray-200">{value.institutionDivision}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200">{value.spkSignatureDate}</td>
      <td className="border-b border-gray-200">{value.spkTimePeriod}</td>
      <td className="border-b border-gray-200">{value.spkDueDate}</td>
      <td className="px-5 border-b border-gray-200">
        <Button
          onClick={() => {
            navigate(`/dashboard/partnerships/spk/${value.spkId}`);
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
      <h1 className="text-2xl font-semibold">Tabel Surat SPK</h1>
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

      {isModalOpen && accessRole === 'LSD-SMS' && (
        <AddSpkModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isModalOpen && accessRole === 'SDI-SMS' && (
        <AddModalSpkINGO
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
