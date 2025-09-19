import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft } from 'lucide-react';

import { Table } from '../../fragments/Table';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Pagination } from '../../fragments/Pagination';
import { Button } from '../../elements/Button';
import { Label } from '../../elements/Label';

import { UnivAudience } from '../../../data/data_univ';
import { MediaAudience } from '../../../data/data_media';
import { INGOAudience } from '../../../data/data_ingo';

import { AddModalAudienceUniv } from '../../fragments/modalforms/univ/AddModalAudienceUniv';
import { AddModalAudienceMedia } from '../../fragments/modalforms/media/AddModalAudienceMedia';
import { AddModalAudienceINGO } from '../../fragments/modalforms/ingo/AddModalAudienceINGO';
import { selectAccessRole } from '../../../states/features/auth/authSelectors';
import { selectAudiences } from '../../../states/features/audience/audienceSelectors';
import { asyncGetAudiences } from '../../../states/features/audience/audienceThunks';
import { useNavigate } from 'react-router-dom';

export const Audiences = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectAudiences);
  const accessRole = useSelector(selectAccessRole);

  useEffect(() => {
    dispatch(asyncGetAudiences());
  }, []);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  let filterOptions = [];

  if (accessRole === 'LSD-SMS') {
    filterOptions = [
      {
        label: 'Status',
        options: [
          { label: 'Belum Audiensi', value: 'belum' },
          { label: 'Re-Audiensi', value: 're-audiensi' },
          { label: 'Selesai', value: 'selesai' },
        ],
      },
    ];
  } else if (accessRole === 'SCP-SMS') {
    filterOptions = [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Pemerintah Pusat', value: 'pemerintah pusat' },
          { label: 'Pemerintah Daerah', value: 'pemerintah daerah' },
          { label: 'Dunia Usaha', value: 'dunia usaha' },
          { label: 'Media Massa', value: 'media massa' },
        ],
      },
      {
        label: 'Status',
        options: [
          { label: 'Belum Audiensi', value: 'belum' },
          { label: 'Re-Audiensi', value: 're-audiensi' },
          { label: 'Selesai', value: 'selesai' },
        ],
      },
    ];
  } else {
    filterOptions = [
      {
        label: 'Status',
        options: [
          { label: 'Belum Audiensi', value: 'belum' },
          { label: 'Re-Audiensi', value: 're-audiensi' },
          { label: 'Selesai', value: 'selesai' },
        ],
      },
    ];
  }

  const headers = [
    'No',
    'Nama Instansi',
    'Jenis Instansi',
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

      {isModalOpen && accessRole === 'LSD-SMS' && (
        <AddModalAudienceUniv
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalOpen && accessRole === 'SCP-SMS' && (
        <AddModalAudienceMedia
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalOpen && accessRole === 'SDI-SMS' && (
        <AddModalAudienceINGO
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
