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
} from '../../../states/features/auth/authSelectors';
import { selectAudiences } from '../../../states/features/audience/audienceSelectors';
import { asyncGetAudiences } from '../../../states/features/audience/audienceThunks';
import { useNavigate } from 'react-router-dom';
import AddAudienceModal from '../../fragments/AddAudienceModal';
import { getFiltersByModuleAndRole } from '../../../utils/filterOptions';

export const Audiences = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectAudiences);
  const accessRole = useSelector(selectAccessRole);
  const accessTypeId = useSelector(selectAccessTypeInstitutionsId);

  useEffect(() => {
    dispatch(asyncGetAudiences());
  }, []);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterOptions = getFiltersByModuleAndRole('audience', accessRole);

  const headers = [
    'No',
    'Nama Instansi',
    'Jenis Audiensi',
    'Tanggal',
    'Jam',
    'Jenis',
    'Status',
    'Aksi',
  ];

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
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
        filters={filterOptions}
        onFilterSet={(f) => setFilters(f)}
        searchWidth="w-1/4"
      />
      <Table headers={headers} data={data} renderRow={renderRow} />
      <Pagination />

      {isModalOpen && (
        <AddAudienceModal
          accessTypeId={accessTypeId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
