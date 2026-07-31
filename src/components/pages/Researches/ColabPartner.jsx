import { Button } from '../../elements/Button';
import { Table } from '../../fragments/Table';
import { Pagination } from '../../fragments/Pagination';
import { TableToolbar } from '../../fragments/TableToolbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectAccessTypeInstitutionsId,
  selectedAccessTypeInstitutionsId,
} from '../../../states/features/auth/authSelectors';

import { useNavigate } from 'react-router-dom';
import {
  selectCollabLoading,
  selectCollabs,
  selectCollabMeta,
} from '../../../states/features/research/collab/collabSelectors';
import { asyncGetResearchCollab } from '../../../states/features/research/collab/collabThunks';
import AddResearchCollabModal from '../../fragments/AddResearchCollabModal';
import { usePermission } from '../../../hooks/usePermission';
import { PERM } from '../../../constants/permissions';

export const ColabPartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { can } = usePermission();

  const data = useSelector(selectCollabs);
  const loading = useSelector(selectCollabLoading);
  const meta = useSelector(selectCollabMeta);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);
  const selectAccessType = useSelector(selectAccessTypeInstitutionsId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      asyncGetResearchCollab({
        query,
        typeId: selectedAccessTypeId,
        page: currentPage,
      }),
    );
  }, [dispatch, query, selectedAccessTypeId, currentPage]);

  const renderRow = (value, index) => (
    <tr
      key={index}
      className='border-b border-[#E7EDF4] h-10'
    >
      <td className='py-3'>
        {(currentPage - 1) * (meta?.limit || 10) + index + 1}
      </td>
      <td>{value.institutionName}</td>
      <td>{value.institutiontype}</td>
      <td>{value.institutionRegion}</td>
      <td>{value.researchPrograms.join(', ')}</td>
      <td>
        <Button
          onClick={() => {
            navigate(`/dashboard/research/colab-partner/${value.id}`);
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
      <h1 className='text-2xl font-semibold'>Daftar Riset Kolaborasi Mitra</h1>
      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setIsModalOpen(true)}
        canCreate={can(PERM.RESEARCH_COLLAB_CREATE)}
        onFilterSet={() => console.log('Filter diset')}
        searchWidth='w-1/4'
      />
      <Table
        headers={[
          'No',
          'Nama',
          'Jenis ',
          'Region',
          'Program Rencana Kolaborasi',
          'Aksi',
        ]}
        data={data}
        renderRow={renderRow}
        isLoading={loading}
      />
      <Pagination
        currentPage={meta?.page || 1}
        totalPages={meta?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isModalOpen && (
        <AddResearchCollabModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          accessTypeId={selectAccessType}
        />
      )}
    </div>
  );
};
