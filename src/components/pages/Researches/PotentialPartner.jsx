import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '../../elements/Label';
import { Button } from '../../elements/Button';
import { Table } from '../../fragments/Table';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Pagination } from '../../fragments/Pagination';

import { selectPotentials } from '../../../states/features/research/potential/potentialSelectors';
import { asyncGetResearchPotential } from '../../../states/features/research/potential/potentialThunks';
import { useNavigate } from 'react-router-dom';
import {
  selectAccessRole,
  selectAccessTypeInstitutionsId,
  selectedAccessTypeInstitutionsId,
} from '../../../states/features/auth/authSelectors';
import { getFiltersByModuleAndRole } from '../../../utils/filterOptions';

import AddResearchPotentialModal from '../../fragments/AddResearchPotentialModal';

export const PotentialPartner = () => {
  const [modalType, setModalType] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectPotentials);
  const accessRole = useSelector(selectAccessRole);
  const accessTypeId = useSelector(selectAccessTypeInstitutionsId);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);

  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(
      asyncGetResearchPotential({ query, typeId: selectedAccessTypeId })
    );
  }, [dispatch, query]);

  const headers = [
    'No',
    'Nama Instansi',
    'Jenis Instansi',
    'Region',
    'Program LSD',
    'Status',
    'Aksi',
  ];

  const filterOptions = getFiltersByModuleAndRole('potential', accessRole);

  let modalSelector = null;
  if (accessRole === 'LSD-SMS') {
    modalSelector = {
      'Jenis Instansi': [
        {
          label: 'Universitas',
          onClick: () => {
            setModalType(1);
            setOpenModal(true);
          },
        },
        {
          label: 'Lembaga Sosial',
          onClick: () => {
            setModalType(2);
            setOpenModal(true);
          },
        },
      ],
    };
  }

  const handleAddClick = () => {
    if (accessRole === 'LSD-SMS') {
      console.log(
        "Tombol 'Tambah' diklik untuk universitas, seharusnya menampilkan dropdown."
      );
    } else if (accessRole === 'SDI-SMS') {
      setModalType(3);
      setOpenModal(true);
    } else {
      setOpenModal(true);
    }
  };

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
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
              `/dashboard/research/potential-partner/${value.researchPotentialId}`
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
    <>
      <h1 className="text-2xl font-semibold">Daftar Riset Potensial Mitra</h1>

      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={handleAddClick} // Ini akan terpanggil jika addOptions TIDAK ADA
        addOptions={modalSelector} // Ini hanya akan ada jika stakeholder === "universitas"
        filters={[
          filterOptions,
          {
            label: 'Status Kontak',
            options: [
              { label: 'Sudah dikontak', value: 'sudah' },
              { label: 'Belum dikontak', value: 'belum' },
            ],
          },
        ]}
        onFilterSet={() => console.log('Filter diset')}
        searchWidth="w-1/4"
      />

      <Table headers={headers} data={data} renderRow={renderRow} />
      <Pagination />

      <AddResearchPotentialModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setModalType(null);
        }}
        accessTypeId={accessTypeId}
      />
    </>
  );
};
