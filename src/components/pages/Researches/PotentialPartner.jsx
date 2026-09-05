import { Eye } from 'lucide-react';
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
import {
  resolveTypeIdParam,
  resolveFilterParam,
} from '../../../utils/filterQueryParams';

import AddResearchPotentialModal from '../../fragments/AddResearchPotentialModal';
import { usePermission } from '../../../hooks/usePermission';
import { PERM } from '../../../constants/permissions';

export const PotentialPartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { can } = usePermission();

  const data = useSelector(selectPotentials);
  const meta = useSelector(selectPotentialMeta);
  const loading = useSelector(selectPotentialLoading);
  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);

  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    dispatch(
      asyncGetResearchPotential({
        query,
        typeId: resolveTypeIdParam(activeFilters, selectedAccessTypeId),
        contactStatus: resolveFilterParam(activeFilters, 'Status Kontak'),
        page: currentPage,
      }),
    );
  }, [dispatch, query, selectedAccessTypeId, currentPage, activeFilters]);

  // Reset ke halaman 1 setiap kali pencarian/filter berubah -- kalau tidak,
  // hasil yang menyempit bisa membuat halaman saat ini jadi kosong.
  useEffect(() => {
    setCurrentPage(1);
  }, [query, activeFilters]);

  const filterOptions = getFiltersByModuleAndRole(
    'potential',
    seletedAccessRole,
  );

  const renderRow = (value, index) => (
    <tr
      key={value.researchPotentialId ?? index}
      className='border-b border-[#E7EDF4] last:border-b-0 h-10'
    >
      <td className='py-3'>
        {(currentPage - 1) * (meta?.limit || 10) + index + 1}
      </td>
      <td className='text-left font-medium text-gray-900'>
        {value.instituteName}
      </td>
      <td>{value.partnershipResearchType}</td>
      <td className='text-left'>{value.regionName}</td>
      <td className='text-left max-w-xs'>
        {value.partnershipResearchProgram?.length ? (
          value.partnershipResearchProgram.join(', ')
        ) : (
          <span className='text-gray-400'>-</span>
        )}
      </td>
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
              `/research/potential-partner/${value.researchPotentialId}`,
            );
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
    <>
      <h1 className='text-2xl font-semibold'>Daftar Riset Potensial Mitra</h1>
      <p className='text-sm text-gray-500 mt-1 mb-4'>
        Pendataan lembaga (universitas, NGO, komunitas, media, dunia usaha,
        pemerintahan, hingga lembaga internasional) yang berpotensi menjadi
        mitra kerja sama, lengkap dengan kontak penghubung, status kontak,
        analisis SWOT, kebutuhan, dan program kerja sama yang dijajaki.
      </p>

      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setOpenModal(true)} // Ini akan terpanggil jika addOptions TIDAK ADA
        canCreate={can(PERM.RESEARCH_POTENTIAL_CREATE)}
        filters={filterOptions}
        onFilterSet={setActiveFilters}
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
        emptyMessage={
          query || Object.keys(activeFilters).length > 0
            ? 'Tidak ada hasil yang cocok dengan pencarian/filter.'
            : 'Belum ada riset potensial mitra yang tercatat.'
        }
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
