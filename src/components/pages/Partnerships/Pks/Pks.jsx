import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../../elements/Button';
import { FreezeTable } from '../../../fragments/Table';
import { Pagination } from '../../../fragments/Pagination';
import { TableToolbar } from '../../../fragments/TableToolbar';

import { AddModalPksUniv } from '../../../fragments/modalforms/univ/AddModalPksUniv';
import { AddModalPksMedia } from '../../../fragments/modalforms/media/AddModalPksMedia';
import { AddModalPksINGO } from '../../../fragments/modalforms/ingo/AddModalPksINGO';
import { useNavigate } from 'react-router-dom';
import { selectAccessRole } from '../../../../states/features/auth/authSelectors';
import { selectAllPks } from '../../../../states/features/partnerships/pks/pksSelectors';
import { asyncGetPks } from '../../../../states/features/partnerships/pks/pksThunks';

export const Pks = () => {
  const nagigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(selectAllPks);
  const accessRole = useSelector(selectAccessRole);

  useEffect(() => {
    dispatch(asyncGetPks());
  }, [dispatch]);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  let filters = [];

  if (accessRole === 'LSD-SMS') {
    filters = [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 'universitas' },
          { label: 'Lembaga Sosial', value: 'lembaga sosial' },
        ],
      },
    ];
  } else if (accessRole === 'LSD-SCP') {
    filters = [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Pemerintah Pusat', value: 'Pemerintah Pusat' },
          { label: 'Pemerintah Daerah', value: 'Pemerintah Daerah' },
          { label: 'Dunia Usaha', value: 'Dunia Usaha' },
          { label: 'Media Massa', value: 'Media Massa' },
        ],
      },
    ];
  } else {
    filters = [];
  }

  const headers = [
    'No.',
    'Nama Instansi',
    'Jenis Instansi',
    'Divisi Instansi',
    'Jenis Kerjasama',
    'Jangka Kerjasama',
    'Jatuh Tempo',
    'Tahun Tanda Tangan',
    'Aksi',
  ];

  const renderRowFreeze = (value, index) => (
    <tr key={index} className="border-b border-r border-[#E7EDF4] h-10">
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td className="border-b border-gray-200">{value.name}</td>
      <td className="border-b border-gray-200">{value.jenis}</td>
      <td className="border-b border-gray-200">{value.division}</td>
    </tr>
  );

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="border-b border-gray-200">{value.typePartnership}</td>
      <td className="border-b border-gray-200">{value.pksTimePeriod}</td>
      <td className="border-b border-gray-200">{value.pksDueDate}</td>
      <td className="border-b border-gray-200">{value.pksSignatureDate}</td>
      <td className="px-6 py-3 border-b border-gray-200">
        <Button
          className="text-[#0D4690] underline cursor-pointer"
          onClick={() => {
            nagigate(`/dashboard/partnerships/pks/${value.pksId}`);
          }}
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel PKS</h1>
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
        filters={filters}
        onFilterSet={() => console.log('Filter diset')}
        searchWidth="w-1/4"
      />
      <div className="w-full overflow-hidden h-fit">
        <FreezeTable
          headers={headers}
          data={data}
          renderRow={renderRow}
          renderRowFreeze={renderRowFreeze}
          freezeCol={4}
        />
      </div>
      <Pagination />

      {isModalOpen && stakeholder === 'universitas' && (
        <AddModalPksUniv
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalOpen && stakeholder === 'media' && (
        <AddModalPksMedia
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalOpen && stakeholder === 'lembagaInternasional' && (
        <AddModalPksINGO
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
