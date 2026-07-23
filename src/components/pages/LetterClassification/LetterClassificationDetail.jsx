import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Pencil, Trash2 } from 'lucide-react';
import { Table } from '../../fragments/Table';
import { TableToolbar } from '../../fragments/TableToolbar';
import ConfirmationModal from '../../fragments/ConfirmationModal';
import ClassificationFormModal from '../../fragments/ClassificationFormModal';
import { selectHasAccess } from '../../../states/features/auth/authSelectors';
import {
  asyncGetClassifications,
  asyncGetSubClassificationsList,
  asyncDeleteSubClassificationById,
} from '../../../states/features/classification/classificationThunks';
import {
  selectClassifications,
  selectSubClassifications,
  selectClassificationLoading,
} from '../../../states/features/classification/classificationSelectors';

export const LetterClassificationDetail = () => {
  const { id } = useParams();
  const classificationId = Number(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasAccess = useSelector(selectHasAccess);

  const [search, setSearch] = useState('');
  const [formModal, setFormModal] = useState({ open: false, mode: 'add', item: null });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const classifications = useSelector(selectClassifications);
  const subClassifications = useSelector(selectSubClassifications);
  const loading = useSelector(selectClassificationLoading);

  const refetchAll = () => {
    dispatch(asyncGetClassifications());
    dispatch(asyncGetSubClassificationsList());
  };

  useEffect(() => {
    refetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const classification = classifications.find((item) => item.id === classificationId);

  const items = useMemo(
    () =>
      subClassifications.filter(
        (item) => item.id_partnership_letter_number_classification === classificationId,
      ),
    [subClassifications, classificationId],
  );

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter(
      (item) =>
        item.name?.toLowerCase().includes(keyword) ||
        item.sub_code?.toLowerCase().includes(keyword),
    );
  }, [items, search]);

  const openAdd = () => setFormModal({ open: true, mode: 'add', item: null });
  const openEdit = (item) => setFormModal({ open: true, mode: 'edit', item });
  const closeForm = () => setFormModal({ open: false, mode: 'add', item: null });

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await dispatch(asyncDeleteSubClassificationById({ id: deleteTarget.id })).unwrap();
      setDeleteTarget(null);
    } catch (err) {
      // Guardrail backend (mis. masih dipakai register nomor surat) muncul di sini
      console.error(err);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderRow = (item, index) => (
    <tr key={item.id} className='border-b border-[#E7EDF4] h-10'>
      <td className='py-3 border-b border-gray-200'>{index + 1}</td>
      <td className='p-3 border-b border-gray-200'>{item.name}</td>
      <td className='p-3 border-b border-gray-200'>{item.sub_code}</td>
      <td className='p-3 border-b border-gray-200'>
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={() => openEdit(item)}
            disabled={!hasAccess}
            className='text-[#0D4690] hover:bg-[#E7EDF4] p-2 rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
            title='Ubah'
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => setDeleteTarget(item)}
            disabled={!hasAccess}
            className='text-red-600 hover:bg-red-50 p-2 rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
            title='Hapus'
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <button
        onClick={() => navigate('/dashboard/letter-classifications')}
        className='flex items-center gap-1 text-sm text-[#0D4690] hover:underline cursor-pointer mb-2'
      >
        <ChevronLeft size={16} />
        Kembali ke Klasifikasi
      </button>

      <h1 className='text-2xl font-semibold'>
        {classification ? classification.name : 'Klasifikasi'}
        {classification?.code && (
          <span className='ml-2 text-base font-normal text-gray-400'>
            ({classification.code})
          </span>
        )}
      </h1>
      <p className='text-sm text-gray-500 mt-1'>
        Kelola sub-klasifikasi yang termasuk dalam klasifikasi ini. Kode sub
        inilah yang muncul pada nomor surat (mis. 3182/{classification?.code || 'ADM'}
        -CLP/<b>1</b>/I/2026).
      </p>

      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={openAdd}
        searchWidth='w-1/4'
      />

      <div>
        <Table
          headers={['No', 'Nama', 'Kode Sub', 'Aksi']}
          data={filteredData}
          renderRow={renderRow}
          isLoading={loading}
        />
      </div>

      {formModal.open && (
        <ClassificationFormModal
          isOpen={formModal.open}
          onClose={closeForm}
          kind='subClassification'
          mode={formModal.mode}
          initialData={formModal.item}
          fixedClassificationId={classificationId}
          onSuccess={refetchAll}
        />
      )}

      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title='Hapus Sub-Klasifikasi'
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.name}"?`}
        confirmLabel='Hapus'
        isDanger
        isLoading={isDeleting}
      />
    </div>
  );
};
