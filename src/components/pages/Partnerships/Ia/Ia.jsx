import { Label } from '../../../elements/Label';
import { Button } from '../../../elements/Button';
import { FreezeTable } from '../../../fragments/Table';
import { Pagination } from '../../../fragments/Pagination';
import { TableToolbar } from '../../../fragments/TableToolbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modal
import { useNavigate } from 'react-router-dom';
import { asyncGetImplementationAgreements } from '../../../../states/features/partnerships/ia/iaThunks';
import {
  selectAllIAs,
  selectIALoading,
  selectIaMeta,
} from '../../../../states/features/partnerships/ia/iaSelectors';
import {
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../../states/features/auth/authSelectors';
import { getFiltersByModuleAndRole } from '../../../../utils/filterOptions';
import { resolveTypeIdParam } from '../../../../utils/filterQueryParams';
import AddIaModal from '../../../fragments/AddIaModal';
import { usePermission } from '../../../../hooks/usePermission';
import { PERM } from '../../../../constants/permissions';

export const Ia = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { can } = usePermission();

  const data = useSelector(selectAllIAs);
  const loading = useSelector(selectIALoading);
  const meta = useSelector(selectIaMeta);

  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);
  const filterOptions = getFiltersByModuleAndRole('ia', seletedAccessRole);

  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      asyncGetImplementationAgreements({
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
      <td className='py-3 px-4 border-b border-gray-200'>
        <Label
          label={value.iaPartnershipStatusName}
          status='success'
        />
      </td>
      <td className='px-4 border-b border-gray-200'>
        <Label
          label={value.programName}
          status='warning'
        />
      </td>
      <td className='px-4 border-b border-gray-200'>
        {value.iaYearOfImplementations}
      </td>
      <td className='px-4 border-b border-gray-200'>{value.batchName}</td>
      <td className='px-4 border-b border-gray-200'>
        <Button
          onClick={() => {
            navigate(
              `/dashboard/partnerships/implementation-agreements/${value.iaId}`,
            );
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
      <h1 className='text-2xl font-semibold'>Tabel IA</h1>

      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setIsModalOpen(true)}
        canCreate={can(PERM.PARTNERSHIPS_IA_CREATE)}
        filters={filterOptions}
        onFilterSet={setActiveFilters}
        searchWidth='w-1/4'
      />

      <FreezeTable
        headers={[
          'No',
          'Nama',
          'Jenis',
          'Divisi',
          'Status Kerjasama',
          'Program Implementasi',
          'Tahun Implementasi',
          'Batch',
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
            : 'Belum ada IA yang tercatat.'
        }
      />

      <Pagination
        currentPage={meta?.page || 1}
        totalPages={meta?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Modal */}
      {isModalOpen && (
        <AddIaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          accessTypeId={selectedAccessTypeId}
        />
      )}
    </div>
  );
};
