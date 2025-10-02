import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '../../elements/Label';
import { Button } from '../../elements/Button';
import { Table } from '../../fragments/Table';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Pagination } from '../../fragments/Pagination';
import { AddModalUniv } from '../../fragments/modalforms/univ/AddModalUniv';
import { AddModalSocialInstitution } from '../../fragments/modalforms/univ/addModalSocialInstitution';
import { AddModalPotentialResearch } from '../../fragments/modalforms/ingo/AddModalPotentialResearch';

import { UnivPotentialPartnerResearch } from '../../../data/data_univ';
import { INGOPotentialPartnerResearch } from '../../../data/data_ingo';

import { selectPotentials } from '../../../states/features/research/potential/potentialSelectors';
import { asyncGetResearchPotential } from '../../../states/features/research/potential/potentialThunks';
import { useNavigate } from 'react-router-dom';
import { selectAccessRole } from '../../../states/features/auth/authSelectors';

export const PotentialPartner = () => {
  const [search, setSearch] = useState('');
  const [modalType, setModalType] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectPotentials);
  const accessRole = useSelector(selectAccessRole);

  useEffect(() => {
    dispatch(asyncGetResearchPotential());
  }, []);

  const headers = [
    'No',
    'Nama Instansi',
    'Jenis Instansi',
    'Region',
    'Program LSD',
    'Status',
    'Aksi',
  ];

  let filterType;

  if (accessRole === 'LSD-SMS') {
    filterType = {
      label: 'Jenis Instansi',
      options: [
        { label: 'Universitas', value: 'universitas' },
        { label: 'Lembaga Sosial', value: 'lembaga sosial' },
      ],
    };
  } else {
    filterType = {
      label: 'Cluster',
      options: [
        { label: 'Kesehatan', value: 'kesehatan' },
        { label: 'Pendidikan', value: 'pendidikan' },
        { label: 'Lingkungan', value: 'lingkungan' },
      ],
    };
  }

  let modalSelector = null;
  if (accessRole === 'LSD-SMS') {
    modalSelector = {
      'Jenis Instansi': [
        {
          label: 'Universitas',
          onClick: () => {
            setModalType('universitas');
            setOpenModal(true);
          },
        },
        {
          label: 'Lembaga Sosial',
          onClick: () => {
            setModalType('lembaga sosial');
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
      setModalType('INGO');
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
      <td>{value.partnershipResearchProvincies}</td>
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
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={handleAddClick} // Ini akan terpanggil jika addOptions TIDAK ADA
        addOptions={modalSelector} // Ini hanya akan ada jika stakeholder === "universitas"
        filters={[
          filterType,
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

      {modalType === 'universitas' && (
        <AddModalUniv
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
            setModalType(null);
          }}
        />
      )}

      {modalType === 'lembaga sosial' && (
        <AddModalSocialInstitution
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
            setModalType(null);
          }}
        />
      )}

      {modalType === 'INGO' && (
        <AddModalPotentialResearch
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
            setModalType(null);
          }}
        />
      )}

      <Table headers={headers} data={data} renderRow={renderRow} />
      <Pagination />
    </>
  );
};
