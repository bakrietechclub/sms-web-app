import { Button } from '../../elements/Button';
import { Table } from '../../fragments/Table';
import { useState, useEffect, useMemo } from 'react';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Pagination } from '../../fragments/Pagination';
// import WAIcon from '../../assets/icons/whatsappIcon.png';t';

import { useDispatch, useSelector } from 'react-redux';

import { AddModalCoorGroupUniv } from '../../fragments/modalforms/univ/AddModalCoorGroupUniv';
import { AddModalCoorGroupMedia } from '../../fragments/modalforms/media/AddModalCoorGroupMedia';
import { AddModalCoorGroupINGO } from '../../fragments/modalforms/ingo/AddModalCoorGroupINGO';
import { useNavigate } from 'react-router-dom';
import { selectGroups } from '../../../states/features/group/groupSelectors';
import { selectAccessRole } from '../../../states/features/auth/authSelectors';
import { asyncGetGroups } from '../../../states/features/group/groupThunks';

export const CoordinationGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectGroups);
  const accessRole = useSelector(selectAccessRole);

  useEffect(() => {
    dispatch(asyncGetGroups());
  }, [dispatch]);

  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  let filterOptions = null;
  if (accessRole === 'universitas') {
    filterOptions = [
      {
        label: 'Jenis Instansi',
        options: [
          { label: 'Universitas', value: 'universitas' },
          { label: 'Lembaga Sosial', value: 'lembaga sosial' },
        ],
      },
    ];
  } else if (accessRole === 'media') {
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
    ];
  }

  const headers = [
    'No',
    'Nama Instansi',
    'Jenis Instansi',
    'Divisi Instansi',
    'Link Grup',
    'Kontak PIC',
    'Aksi',
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.instituteName}</td>
      <td>{value.parnershipResearchType}</td>
      <td>{value.division}</td>
      <td>
        <Button
          className="text-white bg-[#E89229] rounded-lg w-full py-1.5 hover:py-1 hover:bg-[#d18325] ease-in-out duration-200 cursor-pointer"
          onClick={() => window.open(value.groupUrl)}
        >
          <div className="flex underline items-center justify-center gap-2">
            {/* <img src={WAIcon} alt="." /> */}
            Link Grup
          </div>
        </Button>
      </td>
      <td>{value.contact}</td>
      <td>
        <Button
          className="text-[#0D4690] underline cursor-pointer"
          onClick={() => {
            navigate(`/dashboard/groups/${value.groupId}`);
          }}
        >
          Lihat Detail
        </Button>
      </td>
    </tr>
  );

  // Tampilan utama
  return (
    <div>
      <h1 className="text-2xl font-semibold">Tabel Grup Koordinasi</h1>

      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={() => setOpenModal(true)}
        filters={filterOptions}
        onFilterSet={(selectedFilters) => {
          // selectedFilters: { [label]: value }
          setFilters(selectedFilters);
        }}
        searchWidth="w-1/4"
      />

      {/* Modal Add berdasarkan stakeholder */}
      {accessRole === 'universitas' && (
        <AddModalCoorGroupUniv
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
      {accessRole === 'media' && (
        <AddModalCoorGroupMedia
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
      {accessRole === 'lembagaInternasional' && (
        <AddModalCoorGroupINGO
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}

      <Table headers={headers} data={data} renderRow={renderRow} />
      <Pagination />
    </div>
  );
};
