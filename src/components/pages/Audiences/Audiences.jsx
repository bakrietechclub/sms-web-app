import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table } from '../../fragments/Table';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Pagination } from '../../fragments/Pagination';
import { Button } from '../../elements/Button';
import { Label } from '../../elements/Label';
import {
  selectAccessRole,
  selectAccessTypeInstitutionsId,
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../states/features/auth/authSelectors';
import { selectAudienceLoading, selectAudiences } from '../../../states/features/audience/audienceSelectors';
import { asyncGetAudiences } from '../../../states/features/audience/audienceThunks';
import { useNavigate } from 'react-router-dom';
import AddAudienceModal from '../../fragments/AddAudienceModal';
import { getFiltersByModuleAndRole } from '../../../utils/filterOptions';

export const Audiences = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectAudiences);
  const loading = useSelector(selectAudienceLoading);

  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);

  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(asyncGetAudiences({ query, typeId: selectedAccessTypeId }));
  }, [dispatch, query, selectedAccessTypeId]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterOptions = getFiltersByModuleAndRole(
    'audience',
    seletedAccessRole
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.instituteName}</td>
      <td>{value.audiencesType}</td>
      <td>{value.audiencesTime}</td>
      <td>{value.audiencesDate}</td>
      <td>
        <Label
          label={value.audiencesType ? 'Online' : 'Offline'}
          status={value.audiencesType === 'Online' ? 'info' : 'white'}
        />
      </td>
      <td>
        <Label
          label={value.audiencesStatus}
          status={
            value.audiencesStatus === 'Re-audiensi'
              ? 'warning'
              : value.audiencesStatus === 'Selesai'
                ? 'success'
                : 'danger'
          }
        />
      </td>
      <td>
        <Button
          onClick={() => {
            navigate(`/dashboard/audiences/${value.audiencesId}`);
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
      <h1 className="text-2xl font-semibold">Tabel Data Audiensi</h1>
      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setIsModalOpen(true)}
        filters={filterOptions}
        onFilterSet={(f) => setFilters(f)}
        searchWidth="w-1/4"
      />
      <Table
        headers={[
          'No',
          'Nama',
          'Jenis Audiensi',
          'Tanggal',
          'Jam',
          'Jenis',
          'Status',
          'Aksi',
        ]}
        data={data}
        renderRow={renderRow}
        isLoading={loading}
      />
      <Pagination />

      {isModalOpen && (
        <AddAudienceModal
          accessTypeId={selectedAccessTypeId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
