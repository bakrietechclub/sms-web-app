import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FreezeTable } from '../../../fragments/Table';
import { Pagination } from '../../../fragments/Pagination';
import { TableToolbar } from '../../../fragments/TableToolbar';

import { useNavigate } from 'react-router-dom';
import { asyncGetSpk } from '../../../../states/features/partnerships/spk/spkThunks';
import {
  selectAllSpk,
  selectSpkLoading,
  selectSpkMeta,
} from '../../../../states/features/partnerships/spk/spkSelectors';
import {
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../../states/features/auth/authSelectors';

import { getFiltersByModuleAndRole } from '../../../../utils/filterOptions.js';
import { resolveTypeIdParam } from '../../../../utils/filterQueryParams.js';

import { Button } from '../../../elements/Button';
import AddSpkModal from '../../../fragments/AddSpkModal.jsx';
import { usePermission } from '../../../../hooks/usePermission';
import { PERM } from '../../../../constants/permissions';

export const Spk = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { can } = usePermission();

  const data = useSelector(selectAllSpk);
  const loading = useSelector(selectSpkLoading);
  const meta = useSelector(selectSpkMeta);

  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);
  const filterOptions = getFiltersByModuleAndRole('spk', seletedAccessRole);

  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      asyncGetSpk({
        query,
        typeId: resolveTypeIdParam(activeFilters, selectedAccessTypeId),
        page: currentPage,
      }),
    );
  }, [dispatch, query, selectedAccessTypeId, currentPage, activeFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, activeFilters]);

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
      <td className='border-b border-gray-200'>{value.spkSignatureDate}</td>
      <td className='border-b border-gray-200'>{value.spkTimePeriod}</td>
      <td className='border-b border-gray-200'>{value.spkDueDate}</td>
      <td className='px-5 border-b border-gray-200'>
        <Button
          onClick={() => {
            navigate(`/dashboard/partnerships/spk/${value.spkId}`);
          }}
          className='text-[#0D4690] underline cursor-pointer'
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className='text-2xl font-semibold'>Tabel Surat SPK</h1>
      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setIsModalOpen(true)}
        canCreate={can(PERM.PARTNERSHIPS_SPK_CREATE)}
        filters={filterOptions}
        onFilterSet={setActiveFilters}
        searchWidth='w-1/4'
      />

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
        emptyMessage={
          query || Object.keys(activeFilters).length > 0
            ? 'Tidak ada hasil yang cocok dengan pencarian/filter.'
            : 'Belum ada SPK yang tercatat.'
        }
      />
      <Pagination
        currentPage={meta?.page || 1}
        totalPages={meta?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isModalOpen && (
        <AddSpkModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          accessTypeId={selectedAccessTypeId}
        />
      )}
    </div>
  );
};
