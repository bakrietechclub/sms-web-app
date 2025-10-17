import { Button } from '../../elements/Button';
import { Table } from '../../fragments/Table';
import { useState, useEffect, useMemo } from 'react';
import { TableToolbar } from '../../fragments/TableToolbar';
import { Pagination } from '../../fragments/Pagination';
// import WAIcon from '../../assets/icons/whatsappIcon.png';t';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { selectGroups } from '../../../states/features/group/groupSelectors';
import {
  selectAccessRole,
  selectAccessTypeInstitutionsId,
  selectedAccess,
  selectedAccessTypeInstitutionsId,
} from '../../../states/features/auth/authSelectors';
import { asyncGetGroups } from '../../../states/features/group/groupThunks';

import AddCoorGroupModal from '../../fragments/AddCoorGroupModal';
import { getFiltersByModuleAndRole } from '../../../utils/filterOptions';

export const CoordinationGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectGroups);
  const seletedAccessRole = useSelector(selectedAccess);
  const selectedAccessTypeId = useSelector(selectedAccessTypeInstitutionsId);

  const [query, setQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const filterOptions = getFiltersByModuleAndRole('group', seletedAccessRole);

  useEffect(() => {
    dispatch(asyncGetGroups({ query, typeId: selectedAccessTypeId }));
  }, [dispatch, query, selectedAccessTypeId]);

  const renderRow = (value, index) => (
    <tr key={index} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3">{index + 1}</td>
      <td>{value.instituteName}</td>
      <td>{value.parnershipResearchType}</td>
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
        searchValue={query}
        onSearchChange={setQuery}
        onAddClick={() => setOpenModal(true)}
        filters={filterOptions}
        onFilterSet={(selectedFilters) => {
          // selectedFilters: { [label]: value }
          setFilters(selectedFilters);
        }}
        searchWidth="w-1/4"
      />

      <AddCoorGroupModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        accessTypeId={selectedAccessTypeId}
      />

      <Table
        headers={[
          'No',
          'Nama Instansi',
          'Jenis Instansi',
          'Link Grup',
          'Kontak PIC',
          'Aksi',
        ]}
        data={data}
        renderRow={renderRow}
      />
      <Pagination />
    </div>
  );
};
