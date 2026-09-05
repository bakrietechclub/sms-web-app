import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

import { Button } from '../../elements/Button';
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
  const navigate = useNavigate();

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
      <td className='py-2 text-center'>
        <p className='font-semibold text-gray-900'>
          {value.totalStudents} Mahasiswa
        </p>
        <p className='text-xs text-gray-500'>
          {value.totalStudentsRegistered} daftar &middot;{' '}
          {value.totalStudentsActive} aktif
        </p>
      </td>
      <td className='px-4'>
        <Button
          onClick={() => navigate(`/research/potential-recommendations/${value.instituteId}`)}
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
        Rekomendasi lembaga potensial berdasarkan wilayah dan jenis institusi
        yang menjadi cakupan akses Anda, membantu menyaring mitra baru yang
        belum tercatat untuk didekati lebih lanjut. Daftar ini menyoroti
        institusi yang sudah punya mahasiswa aktif di program magang BCF
        (mis. Campus Leaders Program) tapi belum terikat kerja sama formal
        (belum ada MoU/PKS) -- klik &quot;Lihat Detail&quot; pada satu baris
        untuk melihat rincian per Program yang membuktikan angkanya.
      </p>

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
          'Mahasiswa',
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
