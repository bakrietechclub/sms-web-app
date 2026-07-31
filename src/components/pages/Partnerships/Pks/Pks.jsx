import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../elements/Button';
import { FreezeTable } from '../../../fragments/Table';
import { Pagination } from '../../../fragments/Pagination';
import { TableToolbar } from '../../../fragments/TableToolbar';
import AddPksModal from '../../../fragments/AddPksModal';

import {
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../../states/features/auth/authSelectors';
import {
  selectAllPks,
  selectPksLoading,
  selectPksMeta,
} from '../../../../states/features/partnerships/pks/pksSelectors';
import { asyncGetPks } from '../../../../states/features/partnerships/pks/pksThunks';
import { getFiltersByModuleAndRole } from '../../../../utils/filterOptions';
import { usePermission } from '../../../../hooks/usePermission';
import { PERM } from '../../../../constants/permissions';

export const Pks = () => {
  const nagigate = useNavigate();
  const dispatch = useDispatch();
  const { can } = usePermission();

  const data = useSelector(selectAllPks);
  const loading = useSelector(selectPksLoading);
  const meta = useSelector(selectPksMeta);

  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);
  const filterOptions = getFiltersByModuleAndRole('pks', seletedAccessRole);

  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      asyncGetPks({ query, typeId: selectedAccessTypeId, page: currentPage }),
    );
  }, [dispatch, query, selectedAccessTypeId, currentPage]);

  const renderRowFreeze = (value, index) => (
    <tr
      key={index}
      className='border-b border-r border-[#E7EDF4] h-10'
    >
      <td className='py-3 border-b border-gray-200'>
        {(currentPage - 1) * (meta?.limit || 10) + index + 1}
      </td>
      <td className='border-b border-gray-200'>{value.instituteName}</td>
      <td className='border-b border-gray-200'>{value.instituteTypeName}</td>
      <td className='border-b border-gray-200'>{value.institutionDivision}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr
      key={index}
      className='border-b border-[#E7EDF4] h-10'
    >
      <td className='border-b border-gray-200'>{value.pksSignatureDate}</td>
      <td className='border-b border-gray-200'>{value.pksTimePeriod}</td>
      <td className='border-b border-gray-200'>{value.pksDueDate}</td>
      <td className='px-6 py-3 border-b border-gray-200'>
        <Button
          className='text-[#0D4690] underline cursor-pointer'
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
      <h1 className='text-2xl font-semibold'>Tabel PKS</h1>
      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setIsModalOpen(true)}
        canCreate={can(PERM.PARTNERSHIPS_PKS_CREATE)}
        filters={filterOptions}
        onFilterSet={() => console.log('Filter diset')}
        searchWidth='w-1/4'
      />
      <div className='w-full overflow-hidden h-fit'>
        <FreezeTable
          headers={[
            'No.',
            'Nama',
            'Jenis',
            'Divisi',
            'Tanggal Tanda Tangan',
            'Jangka Kerjasama',
            'Jatuh Tempo',
            'Aksi',
          ]}
          data={data}
          renderRow={renderRow}
          renderRowFreeze={renderRowFreeze}
          freezeCol={4}
          isLoading={loading}
        />
      </div>
      <Pagination
        currentPage={meta?.page || 1}
        totalPages={meta?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isModalOpen && (
        <AddPksModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          accessTypeId={selectedAccessTypeId}
        />
      )}
    </div>
  );
};
