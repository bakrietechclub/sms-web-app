import { Label } from '../../../elements/Label';
import { Button } from '../../../elements/Button';
import { FreezeTable } from '../../../fragments/Table';
import { Pagination } from '../../../fragments/Pagination';
import { TableToolbar } from '../../../fragments/TableToolbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modal
import { AddModalIaUniv } from '../../../fragments/modalforms/univ/AddModalIaUniv';
import { AddModalIaINGO } from '../../../fragments/modalforms/ingo/AddModalIaINGO';
import { useNavigate } from 'react-router-dom';
import { asyncGetImplementationAgreements } from '../../../../states/features/partnerships/ia/iaThunks';
import { selectAllIAs } from '../../../../states/features/partnerships/ia/iaSelectors';
import { selectAccessRole } from '../../../../states/features/auth/authSelectors';
import { getFiltersByModuleAndRole } from '../../../../utils/filterOptions';
import AddIaModal from '../../../fragments/AddIaModal';

export const Ia = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetImplementationAgreements());
  }, [dispatch]);

  const data = useSelector(selectAllIAs);
  const accessRole = useSelector(selectAccessRole);

  const filterOptions = getFiltersByModuleAndRole('ia', accessRole);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers = [
    'No',
    'Nama Instansi',
    'Jenis Instansi',
    'Divisi Instansi',
    'Status Kerjasama',
    'Program Implementasi',
    'Tahun Implementasi',
    'Batch',
    'Aksi',
  ];

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td className="border-b border-gray-200">{value.instituteName}</td>
      <td className="border-b border-gray-200">{value.instituteTypeName}</td>
      <td className="border-b border-gray-200">{value.institutionDivision}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3 px-4 border-b border-gray-200">
        <Label label={value.iaPartnershipStatusName} status="success" />
      </td>
      <td className="px-4 border-b border-gray-200">
        <Label label={value.programName} status="warning" />
      </td>
      <td className="px-4 border-b border-gray-200">
        {value.iaYearOfImplementations}
      </td>
      <td className="px-4 border-b border-gray-200">{value.batchName}</td>
      <td className="px-4 border-b border-gray-200">
        <Button
          onClick={() => {
            navigate(
              `/dashboard/partnerships/implementation-agreements/${value.iaId}`
            );
          }}
          className="text-[#0D4690] underline cursor-pointer"
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel IA</h1>

      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
        filters={filterOptions}
        onFilterSet={() => console.log('Filter diset')}
        searchWidth="w-1/4"
      />

      <FreezeTable
        headers={headers}
        data={data}
        renderRow={renderRow}
        renderRowFreeze={renderRowFreeze}
        freezeCol={4}
      />

      <Pagination />

      {/* Modal */}
      {isModalOpen && accessRole === 'LSD-SMS' && (
        <AddIaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isModalOpen && accessRole === 'lembagaInternasional' && (
        <AddModalIaINGO
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
