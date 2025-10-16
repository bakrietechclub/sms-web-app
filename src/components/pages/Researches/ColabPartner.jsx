import { Button } from '../../elements/Button';
import { Table } from '../../fragments/Table';
import { Pagination } from '../../fragments/Pagination';
import { TableToolbar } from '../../fragments/TableToolbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectAccessRole,
  selectAccessTypeInstitutionsId,
  selectedAccessTypeInstitutionsId,
} from '../../../states/features/auth/authSelectors';

import { useNavigate } from 'react-router-dom';
import { selectCollabs } from '../../../states/features/research/collab/collabSelectors';
import { asyncGetResearchCollab } from '../../../states/features/research/collab/collabThunks';
import AddResearchCollabModal from '../../fragments/AddResearchCollabModal';

export const ColabPartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectCollabs);
  const accessRole = useSelector(selectAccessRole);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);
  const selectAccessType = useSelector(selectAccessTypeInstitutionsId);

  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(asyncGetResearchCollab({ query, typeId: selectedAccessTypeId }));
  }, [dispatch, query, selectedAccessTypeId]);

  const headers = [
    'No',
    'Nama Instansi',
    'Jenis Instansi',
    'Region',
    'Program Rencana Kolaborasi',
    'Aksi',
  ];

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.institutionName}</td>
      <td>{value.institutiontype}</td>
      <td>{value.institutionRegion}</td>
      <td>{value.researchPrograms.join(', ')}</td>
      <td>
        <Button
          onClick={() => {
            navigate(`/dashboard/research/colab-partner/${value.id}`);
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
      <h1 className="text-2xl font-semibold">Daftar Riset Kolaborasi Mitra</h1>
      <TableToolbar
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setIsModalOpen(true)}
        onFilterSet={() => console.log('Filter diset')}
        searchWidth="w-1/4"
      />
      <Table headers={headers} data={data} renderRow={renderRow} />
      <Pagination />

      {isModalOpen && (
        <AddResearchCollabModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          accessTypeId={selectAccessType}
        />
      )}
    </div>
  );
};
