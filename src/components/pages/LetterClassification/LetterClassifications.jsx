import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, ChevronRight } from 'lucide-react';
import { Table } from '../../fragments/Table';
import { TableToolbar } from '../../fragments/TableToolbar';
import ConfirmationModal from '../../fragments/ConfirmationModal';
import ClassificationFormModal from '../../fragments/ClassificationFormModal';
import { selectHasAccess } from '../../../states/features/auth/authSelectors';
import {
  asyncGetClassifications,
  asyncGetLetterTypes,
  asyncDeleteClassificationById,
  asyncDeleteLetterTypeById,
} from '../../../states/features/classification/classificationThunks';
import {
  selectClassifications,
  selectLetterTypes,
  selectClassificationLoading,
} from '../../../states/features/classification/classificationSelectors';
import { usePermission } from '../../../hooks/usePermission';
import { PERM } from '../../../constants/permissions';

const TABS = [
  { key: 'classification', label: 'Klasifikasi' },
  { key: 'type', label: 'Jenis Surat' },
];

export const LetterClassifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { can } = usePermission();
  const hasAccess = useSelector(selectHasAccess);
  const canUpdate = hasAccess && can(PERM.LETTER_CLASSIFICATIONS_UPDATE);
  const canDelete = hasAccess && can(PERM.LETTER_CLASSIFICATIONS_DELETE);
  const canCreate = hasAccess && can(PERM.LETTER_CLASSIFICATIONS_CREATE);

  const [activeTab, setActiveTab] = useState('classification');
  const [search, setSearch] = useState('');
  const [formModal, setFormModal] = useState({
    open: false,
    mode: 'add',
    item: null,
  });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const classifications = useSelector(selectClassifications);
  const letterTypes = useSelector(selectLetterTypes);
  const loading = useSelector(selectClassificationLoading);

  const refetchAll = () => {
    dispatch(asyncGetClassifications());
    dispatch(asyncGetLetterTypes());
  };

  useEffect(() => {
    refetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const openAdd = () => setFormModal({ open: true, mode: 'add', item: null });
  const openEdit = (item) => setFormModal({ open: true, mode: 'edit', item });
  const closeForm = () =>
    setFormModal({ open: false, mode: 'add', item: null });

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      if (activeTab === 'classification') {
        await dispatch(
          asyncDeleteClassificationById({ id: deleteTarget.id }),
        ).unwrap();
      } else {
        await dispatch(
          asyncDeleteLetterTypeById({ id: deleteTarget.id }),
        ).unwrap();
      }
      setDeleteTarget(null);
    } catch (err) {
      // Guardrail backend (mis. masih dipakai register nomor surat, atau
      // klasifikasi masih punya sub-klasifikasi) muncul di sini
      console.error(err);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderActions = (item, options = {}) => (
    <td className="p-3 border-b border-gray-200">
      <div
        className="flex items-center justify-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => openEdit(item)}
          disabled={!canUpdate}
          className="text-[#0D4690] hover:bg-[#E7EDF4] p-2 rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          title={
            !canUpdate ? 'Anda tidak memiliki izin untuk mengubah' : 'Ubah'
          }
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => setDeleteTarget(item)}
          disabled={!canDelete}
          className="text-red-600 hover:bg-red-50 p-2 rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          title={
            !canDelete ? 'Anda tidak memiliki izin untuk menghapus' : 'Hapus'
          }
        >
          <Trash2 size={16} />
        </button>
        {options.withChevron && (
          <ChevronRight size={16} className="text-gray-300" />
        )}
      </div>
    </td>
  );

  const renderClassificationRow = (item, index) => (
    <tr
      key={item.id}
      onClick={() => navigate(`/letter-classifications/${item.id}`)}
      className="border-b border-[#E7EDF4] h-10 cursor-pointer hover:bg-[#F5F9FF]"
      title="Kelola sub-klasifikasi dari klasifikasi ini"
    >
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td className="p-3 border-b border-gray-200">{item.name}</td>
      <td className="p-3 border-b border-gray-200">{item.code || '-'}</td>
      {renderActions(item, { withChevron: true })}
    </tr>
  );

  const renderTypeRow = (item, index) => (
    <tr key={item.id} className="border-b border-[#E7EDF4] h-10">
      <td className="py-3 border-b border-gray-200">{index + 1}</td>
      <td className="p-3 border-b border-gray-200">{item.name}</td>
      {renderActions(item)}
    </tr>
  );

  const tabConfig = {
    classification: {
      headers: ['No', 'Nama', 'Kode', 'Aksi'],
      data: classifications,
      renderRow: renderClassificationRow,
      matchesSearch: (item, keyword) =>
        item.name?.toLowerCase().includes(keyword) ||
        item.code?.toLowerCase().includes(keyword),
    },
    type: {
      headers: ['No', 'Nama', 'Aksi'],
      data: letterTypes,
      renderRow: renderTypeRow,
      matchesSearch: (item, keyword) =>
        item.name?.toLowerCase().includes(keyword),
    },
  };

  const current = tabConfig[activeTab];

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return current.data;
    return current.data.filter((item) => current.matchesSearch(item, keyword));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.data, search]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setSearch('');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Klasifikasi Penomoran Surat</h1>
      <p className="text-sm text-gray-500 mt-1">
        Kelola klasifikasi dan jenis surat yang dipakai saat penomoran surat,
        sertifikat, dan surat rekomendasi. Klik salah satu klasifikasi untuk
        mengelola sub-klasifikasinya.
      </p>

      <div className="flex items-center gap-2 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px cursor-pointer ${
              activeTab === tab.key
                ? 'border-[#0D4690] text-[#0D4690]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        <Table
          headers={current.headers}
          data={filteredData}
          renderRow={current.renderRow}
          isLoading={loading}
        />
      </div>

      {formModal.open && (
        <ClassificationFormModal
          isOpen={formModal.open}
          onClose={closeForm}
          kind={activeTab}
          mode={formModal.mode}
          initialData={formModal.item}
          onSuccess={refetchAll}
        />
      )}

      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title={`Hapus ${TABS.find((t) => t.key === activeTab)?.label}`}
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.name}"?`}
        confirmLabel="Hapus"
        isDanger
        isLoading={isDeleting}
      />
    </div>
  );
};
