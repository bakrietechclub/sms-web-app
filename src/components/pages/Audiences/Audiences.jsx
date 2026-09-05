import { Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table } from '../../fragments/Table';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Pagination } from '../../fragments/Pagination';
import { Button } from '../../elements/Button';
import { Label } from '../../elements/Label';
import {
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../states/features/auth/authSelectors';
import {
  selectAudienceLoading,
  selectAudiences,
  selectAudienceMeta,
} from '../../../states/features/audience/audienceSelectors';
import { asyncGetAudiences } from '../../../states/features/audience/audienceThunks';
import { useNavigate } from 'react-router-dom';
import AddAudienceModal from '../../fragments/AddAudienceModal';
import { getFiltersByModuleAndRole } from '../../../utils/filterOptions';
import {
  resolveTypeIdParam,
  resolveFilterParam,
} from '../../../utils/filterQueryParams';
import { usePermission } from '../../../hooks/usePermission';
import { PERM } from '../../../constants/permissions';

export const Audiences = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { can } = usePermission();

  const data = useSelector(selectAudiences);
  const loading = useSelector(selectAudienceLoading);
  const meta = useSelector(selectAudienceMeta);

  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    dispatch(
      asyncGetAudiences({
        query,
        typeId: resolveTypeIdParam(activeFilters, selectedAccessTypeId),
        status: resolveFilterParam(activeFilters, 'Status'),
        page: currentPage,
      }),
    );
  }, [dispatch, query, selectedAccessTypeId, currentPage, activeFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, activeFilters]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterOptions = getFiltersByModuleAndRole(
    'audience',
    seletedAccessRole,
  );

  const renderRow = (value, index) => (
    <tr
      key={index}
      className='border-b border-[#E7EDF4] h-10'
    >
      <td className='py-3'>
        {(currentPage - 1) * (meta?.limit || 10) + index + 1}
      </td>
      <td>{value.instituteName}</td>
      <td>{value.audiencesType}</td>
      <td>{value.audiencesTime}</td>
      <td>{value.audiencesDate}</td>
      <td>
        <Label
          label={value?.audiencesType}
          status={value?.audiencesType === 'Online' ? 'info' : 'white'}
        />
      </td>
      <td>
        <Label
          label={value.audiencesStatus}
          status={
            value.audiencesStatus === 'Re-audiensi'
              ? 'warning'
              : value.audiencesStatus === 'Selesai'
                ? 'success'
                : 'danger'
          }
        />
      </td>
      <td>
        <Button
          onClick={() => {
            navigate(`/audiences/${value.audiencesId}`);
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

  return (
    <div>
      <h1 className='text-2xl font-semibold'>Tabel Data Audiensi</h1>
      <p className='text-sm text-gray-500 mt-1 mb-4'>
        Jadwal pertemuan (audiensi) dengan lembaga yang sudah tercatat di
        Riset Potensial, mencatat tanggal, waktu, jenis, lokasi, dan status
        pelaksanaannya.
      </p>
      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setIsModalOpen(true)}
        canCreate={can(PERM.AUDIENCES_CREATE)}
        filters={filterOptions}
        onFilterSet={setActiveFilters}
        searchWidth='w-1/4'
      />
      <Table
        headers={[
          'No',
          'Nama',
          'Jenis Audiensi',
          'Tanggal',
          'Jam',
          'Jenis',
          'Status',
          'Aksi',
        ]}
        data={data}
        renderRow={renderRow}
        isLoading={loading}
        emptyMessage={
          query || Object.keys(activeFilters).length > 0
            ? 'Tidak ada hasil yang cocok dengan pencarian/filter.'
            : 'Belum ada data audiensi yang tercatat.'
        }
      />
      <Pagination
        currentPage={meta?.page || 1}
        totalPages={meta?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isModalOpen && (
        <AddAudienceModal
          accessTypeId={selectedAccessTypeId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
