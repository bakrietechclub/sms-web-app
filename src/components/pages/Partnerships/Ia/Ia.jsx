import { Label } from '../../../elements/Label';
import { Button } from '../../../elements/Button';
import { FreezeTable } from '../../../fragments/Table';
import { Pagination } from '../../../fragments/Pagination';
import { TableToolbar } from '../../../fragments/TableToolbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Modal
import { useNavigate } from 'react-router-dom';
import { asyncGetImplementationAgreements } from '../../../../states/features/partnerships/ia/iaThunks';
import { selectAllIAs, selectIALoading } from '../../../../states/features/partnerships/ia/iaSelectors';
import {
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../../states/features/auth/authSelectors';
import { getFiltersByModuleAndRole } from '../../../../utils/filterOptions';
import AddIaModal from '../../../fragments/AddIaModal';

export const Ia = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(selectAllIAs);
  const loading = useSelector(selectIALoading);

  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);
  const filterOptions = getFiltersByModuleAndRole('ia', seletedAccessRole);

  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(
      asyncGetImplementationAgreements({ query, typeId: selectedAccessTypeId })
    );
  }, [dispatch, query, selectedAccessTypeId]);

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
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setIsModalOpen(true)}
        filters={filterOptions}
        onFilterSet={() => console.log('Filter diset')}
        searchWidth="w-1/4"
      />

      <FreezeTable
        headers={[
          'No',
          'Nama',
          'Jenis',
          'Divisi',
          'Status Kerjasama',
          'Program Implementasi',
          'Tahun Implementasi',
          'Batch',
          'Aksi',
        ]}
        data={data}
        renderRow={renderRow}
        renderRowFreeze={renderRowFreeze}
        freezeCol={4}
        isLoading={loading}
      />

      <Pagination />

      {/* Modal */}
      {isModalOpen && (
        <AddIaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          accessTypeId={selectedAccessTypeId}
        />
      )}
    </div>
  );
};
