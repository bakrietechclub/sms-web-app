import { Eye } from 'lucide-react';
import { Button } from '../../elements/Button';
import { Table } from '../../fragments/Table';
import { useState, useEffect } from 'react';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Pagination } from '../../fragments/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectGroupLoading,
  selectGroups,
  selectGroupMeta,
} from '../../../states/features/group/groupSelectors';
import {
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../states/features/auth/authSelectors';
import { asyncGetGroups } from '../../../states/features/group/groupThunks';

import AddCoorGroupModal from '../../fragments/AddCoorGroupModal';
import { getFiltersByModuleAndRole } from '../../../utils/filterOptions';
import { resolveTypeIdParam } from '../../../utils/filterQueryParams';
import { usePermission } from '../../../hooks/usePermission';
import { PERM } from '../../../constants/permissions';

export const CoordinationGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { can } = usePermission();

  const data = useSelector(selectGroups);
  const loading = useSelector(selectGroupLoading);
  const meta = useSelector(selectGroupMeta);

  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);

  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});
  const filterOptions = getFiltersByModuleAndRole('group', seletedAccessRole);

  useEffect(() => {
    dispatch(
      asyncGetGroups({
        query,
        typeId: resolveTypeIdParam(activeFilters, selectedAccessTypeId),
        page: currentPage,
      }),
    );
  }, [dispatch, query, selectedAccessTypeId, currentPage, activeFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, activeFilters]);

  const renderRow = (value, index) => (
    <tr
      key={index}
      className='border-b border-[#E7EDF4] h-10'
    >
      <td className='py-3'>
        {(currentPage - 1) * (meta?.limit || 10) + index + 1}
      </td>
      <td>{value.instituteName}</td>
      <td>{value.parnershipResearchType}</td>
      <td>
        <Button
          className='text-white bg-[#E89229] rounded-lg w-full py-1.5 hover:py-1 hover:bg-[#d18325] ease-in-out duration-200 cursor-pointer'
          onClick={() => window.open(value.groupUrl)}
        >
          <div className='flex underline items-center justify-center gap-2'>
            {/* <img src={WAIcon} alt="." /> */}
            Link Grup
          </div>
        </Button>
      </td>
      <td>{value.picName === null ? 'Belum ada PIC' : value.picName}</td>
      <td>
        <Button
          className='inline-flex items-center justify-center p-2 rounded-md text-[#0D4690] hover:bg-[#F5F9FF] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D4690]'
          onClick={() => {
            navigate(`/groups/${value.groupId}`);
          }}
          aria-label='Lihat Detail'
          title='Lihat Detail'
        >
          <Eye className='w-4 h-4' />
        </Button>
      </td>
    </tr>
  );

  // Tampilan utama
  return (
    <div>
      <h1 className='text-2xl font-semibold'>Tabel Grup Koordinasi</h1>
      <p className='text-sm text-gray-500 mt-1 mb-4'>
        Grup komunikasi (mis. WhatsApp) untuk setiap mitra, beserta daftar
        kontak penghubung dan status keaktifannya di grup tersebut.
      </p>

      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setOpenModal(true)}
        canCreate={can(PERM.GROUPS_CREATE)}
        filters={filterOptions}
        onFilterSet={setActiveFilters}
        searchWidth='w-1/4'
      />

      <AddCoorGroupModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        accessTypeId={selectedAccessTypeId}
      />

      <Table
        headers={['No', 'Nama', 'Jenis', 'Link Grup', 'Kontak PIC', 'Aksi']}
        data={data}
        renderRow={renderRow}
        isLoading={loading}
        emptyMessage={
          query || Object.keys(activeFilters).length > 0
            ? 'Tidak ada hasil yang cocok dengan pencarian/filter.'
            : 'Belum ada grup koordinasi yang tercatat.'
        }
      />
      <Pagination
        currentPage={meta?.page || 1}
        totalPages={meta?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};
