import { Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../elements/Button';
import { FreezeTable } from '../../../fragments/Table';
import { Pagination } from '../../../fragments/Pagination';
import { TableToolbar } from '../../../fragments/TableToolbar';
import { useNavigate } from 'react-router-dom';
import {
  selectMouLoading,
  selectMous,
  selectMouMeta,
} from '../../../../states/features/partnerships/mou/mouSelectors';
import {
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../../states/features/auth/authSelectors';
import { asyncGetMou } from '../../../../states/features/partnerships/mou/mouThunks';
import { getFiltersByModuleAndRole } from '../../../../utils/filterOptions';
import { resolveTypeIdParam } from '../../../../utils/filterQueryParams';
import AddMouModal from '../../../fragments/AddMouModal';
import { usePermission } from '../../../../hooks/usePermission';
import { PERM } from '../../../../constants/permissions';

export const Mou = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { can } = usePermission();

  const data = useSelector(selectMous);
  const loading = useSelector(selectMouLoading);
  const meta = useSelector(selectMouMeta);

  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);
  const filterOptions = getFiltersByModuleAndRole('mou', seletedAccessRole);

  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      asyncGetMou({
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
      className='border-b border-r border-[#E7EDF4] h-14'
    >
      <td className='px-4 py-3'>
        {(currentPage - 1) * (meta?.limit || 10) + index + 1}
      </td>
      <td className='px-4 py-3'>{value.instituteName}</td>
      <td className='px-4 py-3'>{value.instituteTypeName}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr
      key={index}
      className='border-b border-[#E7EDF4] h-14'
    >
      <td className='px-4 py-3 border-b border-gray-200'>{value.mouSignatureDate}</td>
      <td className='px-4 py-3 border-b border-gray-200'>{value.mouTimePeriod}</td>
      <td className='px-4 py-3 border-b border-gray-200'>{value.mouDueDate}</td>
      <td className='px-6 py-3 border-b border-gray-200'>
        <Button
          className='inline-flex items-center justify-center p-2 rounded-md text-[#0D4690] hover:bg-[#F5F9FF] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D4690]'
          onClick={() => {
            navigate(`/partnerships/mou/${value.mouId}`);
          }}
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
      <h1 className='text-2xl font-semibold'>Tabel MoU</h1>
      <p className='text-sm text-gray-500 mt-1 mb-4'>
        Nota Kesepahaman, kesepakatan payung yang menandai kedua pihak
        sepakat bekerja sama, wajib berasal dari mitra yang sudah tercatat
        di Riset Potensial.
      </p>
      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setIsModalOpen(true)}
        canCreate={can(PERM.PARTNERSHIPS_MOU_CREATE)}
        filters={filterOptions}
        onFilterSet={setActiveFilters}
        searchWidth='w-1/4'
      />
      <FreezeTable
        headers={[
          'No.',
          'Nama',
          'Jenis',
          'Tanggal Tanda Tangan',
          'Jangka Kerjasama',
          'Jatuh Tempo',
          'Aksi',
        ]}
        data={data}
        renderRowFreeze={renderRowFreeze}
        renderRow={renderRow}
        freezeCol={3}
        isLoading={loading}
        emptyMessage={
          query || Object.keys(activeFilters).length > 0
            ? 'Tidak ada hasil yang cocok dengan pencarian/filter.'
            : 'Belum ada MoU yang tercatat.'
        }
      />
      <Pagination
        currentPage={meta?.page || 1}
        totalPages={meta?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isModalOpen && (
        <AddMouModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          accessTypeId={selectedAccessTypeId}
        />
      )}
    </div>
  );
};
