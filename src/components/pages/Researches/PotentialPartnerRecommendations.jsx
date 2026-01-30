import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table } from '../../fragments/Table';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Pagination } from '../../fragments/Pagination';

import {
  selectPotentialLoading,
  selectPotentialsRecommendations,
  selectPotentialMeta,
} from '../../../states/features/research/potential/potentialSelectors';
import { asyncGetResearchPotentialRecommendations } from '../../../states/features/research/potential/potentialThunks';

import {
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../states/features/auth/authSelectors';
import { getFiltersByModuleAndRole } from '../../../utils/filterOptions';

import AddResearchPotentialModal from '../../fragments/AddResearchPotentialModal';

export const PotentialPartnerRecommendations = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectPotentialsRecommendations);
  const loading = useSelector(selectPotentialLoading);
  const meta = useSelector(selectPotentialMeta);
  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);

  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      asyncGetResearchPotentialRecommendations({
        query,
        typeId: selectedAccessTypeId,
        provincieId: [1, 2, 3, 11, 12],
        page: currentPage,
      }),
    );
  }, [dispatch, query, selectedAccessTypeId, currentPage]);

  const filterOptions = getFiltersByModuleAndRole(
    'potential',
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
      <td>{value.typeName}</td>
      <td>{value.regionName}</td>
      <td>{value.totalStudents}</td>
      <td>{value.totalStudentsRegistered}</td>
      <td>{value.totalStudentsActive}</td>
    </tr>
  );

  return (
    <>
      <h1 className='text-2xl font-semibold'>Daftar Riset Potensial Mitra</h1>

      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        filters={filterOptions}
        onFilterSet={() => console.log('Filter diset')}
        searchWidth='w-1/4'
      />

      <Table
        headers={[
          'No',
          'Nama',
          'Jenis ',
          'Region',
          'Total Mahasiswa',
          'Total Pendaftar',
          'Total Aktif',
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

      <AddResearchPotentialModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        accessTypeId={selectedAccessTypeId}
      />
    </>
  );
};
