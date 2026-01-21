import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '../../elements/Label';
import { Button } from '../../elements/Button';
import { Table } from '../../fragments/Table';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Pagination } from '../../fragments/Pagination';

import {
  selectPotentialLoading,
  selectPotentials,
  selectPotentialMeta,
} from '../../../states/features/research/potential/potentialSelectors';
import { asyncGetResearchPotential } from '../../../states/features/research/potential/potentialThunks';
import { useNavigate } from 'react-router-dom';
import {
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../states/features/auth/authSelectors';
import { getFiltersByModuleAndRole } from '../../../utils/filterOptions';

import AddResearchPotentialModal from '../../fragments/AddResearchPotentialModal';

export const PotentialPartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectPotentials);
  const loading = useSelector(selectPotentialLoading);
  const meta = useSelector(selectPotentialMeta);
  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);

  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      asyncGetResearchPotential({
        query,
        typeId: selectedAccessTypeId,
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
      <td className='py-3'>{index + 1}</td>
      <td>{value.instituteName}</td>
      <td>{value.partnershipResearchType}</td>
      <td>{value.regionName}</td>
      <td>{value.partnershipResearchProgram?.join(', ')}</td>
      <td>
        <Label
          label={value.contactStatus}
          status={
            value.contactStatus === 'Sudah dikontak' ? 'success' : 'danger'
          }
        />
      </td>
      <td>
        <Button
          onClick={() => {
            navigate(
              `/dashboard/research/potential-partner/${value.researchPotentialId}`,
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
    <>
      <h1 className='text-2xl font-semibold'>Daftar Riset Potensial Mitra</h1>

      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setOpenModal(true)} // Ini akan terpanggil jika addOptions TIDAK ADA
        filters={filterOptions}
        onFilterSet={() => console.log('Filter diset')}
        searchWidth='w-1/4'
      />

      <Table
        headers={[
          'No',
          'Nama',
          'Jenis',
          'Region',
          'Program LSD',
          'Status',
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
