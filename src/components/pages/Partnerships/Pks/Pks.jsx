import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../elements/Button';
import { FreezeTable } from '../../../fragments/Table';
import { Pagination } from '../../../fragments/Pagination';
import { TableToolbar } from '../../../fragments/TableToolbar';
import AddPksModal from '../../../fragments/AddPksModal';

import {
  selectAccessRole,
  selectAccessTypeInstitutionsId,
  selectedAccessTypeInstitutionsId,
} from '../../../../states/features/auth/authSelectors';
import { selectAllPks } from '../../../../states/features/partnerships/pks/pksSelectors';
import { asyncGetPks } from '../../../../states/features/partnerships/pks/pksThunks';
import { getFiltersByModuleAndRole } from '../../../../utils/filterOptions';

export const Pks = () => {
  const nagigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(selectAllPks);
  const accessRole = useSelector(selectAccessRole);
  const accessTypeId = useSelector(selectAccessTypeInstitutionsId);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);

  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(asyncGetPks({ query, typeId: selectedAccessTypeId }));
  }, [dispatch, query]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterOptions = getFiltersByModuleAndRole('pks', accessRole);

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
      <td className="border-b border-gray-200">{value.pksSignatureDate}</td>
      <td className="border-b border-gray-200">{value.pksTimePeriod}</td>
      <td className="border-b border-gray-200">{value.pksDueDate}</td>
      <td className="px-6 py-3 border-b border-gray-200">
        <Button
          className="text-[#0D4690] underline cursor-pointer"
          onClick={() => {
            nagigate(`/dashboard/partnerships/pks/${value.pksId}`);
          }}
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel PKS</h1>
      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setIsModalOpen(true)}
        filters={filterOptions}
        onFilterSet={() => console.log('Filter diset')}
        searchWidth="w-1/4"
      />
      <div className="w-full overflow-hidden h-fit">
        <FreezeTable
          headers={headers}
          data={data}
          renderRow={renderRow}
          renderRowFreeze={renderRowFreeze}
          freezeCol={4}
        />
      </div>
      <Pagination />

      {isModalOpen && (
        <AddPksModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          accessTypeId={accessTypeId}
        />
      )}
    </div>
  );
};
