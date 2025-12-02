import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '../../elements/Label';
import { Button } from '../../elements/Button';
import { Table } from '../../fragments/Table';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Pagination } from '../../fragments/Pagination';

import { selectPotentialsRecommendations } from '../../../states/features/research/potential/potentialSelectors';
import { asyncGetResearchPotentialRecommendations } from '../../../states/features/research/potential/potentialThunks';
import { useNavigate } from 'react-router-dom';
import {
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../states/features/auth/authSelectors';
import { getFiltersByModuleAndRole } from '../../../utils/filterOptions';

import AddResearchPotentialModal from '../../fragments/AddResearchPotentialModal';

export const PotentialPartnerRecommendations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectPotentialsRecommendations);
  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);

  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(
      asyncGetResearchPotentialRecommendations({
        query,
        typeId: selectedAccessTypeId,
        provincieId: [1, 2, 3, 11, 12],
      })
    );
  }, [dispatch, query, selectedAccessTypeId]);

  const filterOptions = getFiltersByModuleAndRole(
    'potential',
    seletedAccessRole
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
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
      <h1 className="text-2xl font-semibold">Daftar Riset Potensial Mitra</h1>

      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        filters={filterOptions}
        onFilterSet={() => console.log('Filter diset')}
        searchWidth="w-1/4"
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
      />
      <Pagination />

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
