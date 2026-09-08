import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { X, Loader2 } from 'lucide-react';
import { asyncAddInstitutions } from '../../states/features/institution/institutionThunks';

// Label tampilan md_institutions_type -- back-end-sms belum punya endpoint
// publik untuk daftar jenis instansi (cuma dipakai lewat scoping RBAC), jadi
// dicocokkan manual terhadap isi tabel yang sudah diverifikasi. Diurutkan
// oleh id, difilter ke `defaultTypeId` (cakupan Divisi pemanggil) supaya
// tidak menawarkan jenis yang toh akan ditolak server (lihat
// AddInstitutionsUseCase -- employee cuma boleh menambah instansi pada
// jenis yang jadi cakupan Divisinya).
const INSTITUTION_TYPE_LABELS = {
  1: 'Universitas',
  2: 'Lembaga Sosial',
  3: 'Lembaga Internasional',
  4: 'Pemerintah Pusat',
  5: 'Pemerintah Daerah',
  6: 'Dunia Usaha',
  7: 'Media Masa',
  8: 'BUM Desa',
};

export default function AddInstitutionQuickModal({
  isOpen,
  onClose,
  onSuccess,
  defaultTypeId,
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [typeId, setTypeId] = useState('');
  const [profile, setProfile] = useState('');

  const allowedTypeIds = Array.isArray(defaultTypeId)
    ? defaultTypeId
    : defaultTypeId
      ? [defaultTypeId]
      : Object.keys(INSTITUTION_TYPE_LABELS).map(Number);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setProfile('');
      setError('');
      setTypeId(allowedTypeIds[0] ? String(allowedTypeIds[0]) : '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !typeId) return;

    setIsSubmitting(true);
    setError('');
    dispatch(
      asyncAddInstitutions({
        institutionName: name.trim(),
        institutionTypeId: Number(typeId),
        institutionProfile: profile.trim() || null,
      }),
    )
      .unwrap()
      .then((data) => onSuccess({ id: data.id, name: data.name }))
      .catch((err) => setError(err || 'Gagal menambah instansi.'))
      .finally(() => setIsSubmitting(false));
  };

  // Di-render lewat portal ke document.body -- modal ini SELALU dibuka
  // nested (dari dalam <form> Tambah MoU/PKS/IA/SPK). Tanpa portal, <form>
  // di sini akan jadi form bersarang (invalid HTML) di dalam form induk --
  // browser lalu salah menangani submit tombol "Simpan" di sini, jatuh ke
  // submit native (reload halaman, field ter-serialize ke query string)
  // alih-alih lewat handleSubmit React seperti seharusnya. Portal membuat
  // node DOM-nya jadi anak document.body, lepas dari <form> induk, walau
  // secara pohon React tetap anak dari pemanggilnya (props/context normal).
  return createPortal(
    <>
      {/* Overlay 40% modal induk sudah menggelapkan halaman -- scrim tipis
          di sini (10%) cukup sebagai penanda "aktif di atas" + penangkap
          klik-di-luar, tanpa menumpuk jadi hampir gelap total. */}
      <div
        className='fixed inset-0 z-[60] bg-black opacity-10'
        onClick={onClose}
      />
      <div className='fixed inset-0 z-[70] flex items-center justify-center p-4'>
        <div
          className='bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='px-5 py-4 flex items-center justify-between border-b border-gray-200'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Tambah Instansi Baru
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 cursor-pointer p-1 hover:bg-gray-100 rounded-lg'
              aria-label='Close'
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className='px-5 py-4 space-y-3'
          >
            {error && (
              <p className='text-sm text-[#DC3545] bg-[#FDECEC] rounded-md px-3 py-2'>
                {error}
              </p>
            )}

            <div>
              <label className='block mb-1.5 text-sm font-medium text-gray-700'>
                Nama Instansi <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Masukkan nama instansi'
                autoFocus
                className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4690]/40 focus:border-[#0D4690]'
              />
            </div>

            <div>
              <label className='block mb-1.5 text-sm font-medium text-gray-700'>
                Jenis Instansi <span className='text-red-500'>*</span>
              </label>
              <select
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4690]/40 focus:border-[#0D4690]'
              >
                {allowedTypeIds.map((id) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {INSTITUTION_TYPE_LABELS[id] || `Jenis #${id}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block mb-1.5 text-sm font-medium text-gray-700'>
                Profil Instansi{' '}
                <span className='text-gray-400 font-normal'>(opsional)</span>
              </label>
              <textarea
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                placeholder='Deskripsi singkat instansi'
                rows={3}
                className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4690]/40 focus:border-[#0D4690]'
              />
            </div>

            <div className='flex justify-end gap-2 pt-2 border-t border-gray-200 mt-2'>
              <button
                type='button'
                onClick={onClose}
                disabled={isSubmitting}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer disabled:opacity-50'
              >
                Batal
              </button>
              <button
                type='submit'
                disabled={isSubmitting || !name.trim() || !typeId}
                className='px-4 py-2 text-sm font-medium text-white bg-[#0D4690] rounded-lg hover:bg-blue-800 cursor-pointer disabled:opacity-50 flex items-center gap-2 min-w-[90px] justify-center'
              >
                {isSubmitting ? (
                  <Loader2
                    size={16}
                    className='animate-spin'
                  />
                ) : (
                  'Simpan'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body,
  );
}
