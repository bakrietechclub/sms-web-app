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
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      asyncGetMou({ query, typeId: selectedAccessTypeId, page: currentPage }),
    );
  }, [dispatch, query, selectedAccessTypeId, currentPage]);

  const renderRowFreeze = (value, index) => (
    <tr
      key={index}
      className='border-b border-r border-[#E7EDF4] h-10'
    >
      <td className='py-3'>
        {(currentPage - 1) * (meta?.limit || 10) + index + 1}
      </td>
      <td>{value.instituteName}</td>
      <td>{value.instituteTypeName}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr
      key={index}
      className='border-b border-[#E7EDF4] h-10'
    >
      <td className='border-b border-gray-200'>{value.mouSignatureDate}</td>
      <td className='border-b border-gray-200'>{value.mouTimePeriod}</td>
      <td className='border-b border-gray-200'>{value.mouDueDate}</td>
      <td className='px-6 py-3 border-b border-gray-200'>
        <Button
          className='text-[#0D4690] underline cursor-pointer'
          onClick={() => {
            navigate(`/dashboard/partnerships/mou/${value.mouId}`);
          }}
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className='text-2xl font-semibold'>Tabel MoU</h1>
      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setIsModalOpen(true)}
        canCreate={can(PERM.PARTNERSHIPS_MOU_CREATE)}
        filters={filterOptions}
        onFilterSet={(f) => setFilters(f)}
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
