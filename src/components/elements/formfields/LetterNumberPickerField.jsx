import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { asyncGetAvailableLetterNumbers } from '../../../states/features/letter/letterThunks';
import { selectAvailableLetterNumbers } from '../../../states/features/letter/letterSelectors';
import AddModalLetterNumbering from '../../fragments/AddModalLetterNumbering';

/**
 * Field "Nomor Surat" untuk form Tambah MoU/PKS/IA/SPK -- mengikuti pola
 * "pilih yang sudah ada, atau buat baru" yang sama seperti field Nama
 * Instansi di AddMouModal (react-select + tombol "+ Tambah ... Baru" yang
 * membuka modal ringkas, hasilnya langsung terpilih).
 *
 * Sebelumnya field ini HANYA bisa diisi dengan menerbitkan nomor baru lewat
 * modal (RedirectTextField), padahal nomor yang sudah diterbitkan sebelumnya
 * (mis. dari halaman Penomoran Surat) seharusnya juga bisa langsung dipakai.
 */
export default function LetterNumberPickerField({
  name,
  label,
  typeId,
  register,
  setValue,
  isRequired,
}) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [openIssueModal, setOpenIssueModal] = useState(false);
  const availableNumbers = useSelector(selectAvailableLetterNumbers);

  useEffect(() => {
    register(name, { required: !!isRequired });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register, name]);

  const fetchAvailable = () => dispatch(asyncGetAvailableLetterNumbers({ typeId }));

  useEffect(() => {
    fetchAvailable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, typeId]);

  const options = availableNumbers.map((item) => ({
    value: item.letterNumberId,
    label: item.letterSubject
      ? `${item.letterReferenceNumber} — ${item.letterSubject}`
      : item.letterReferenceNumber,
  }));

  const handleChange = (option) => {
    setSelected(option);
    setValue(name, option ? option.value : null, { shouldValidate: true });
  };

  const handleIssueSuccess = ({ letterNumberId, letterReferenceNumber }) => {
    setSelected({ value: letterNumberId, label: letterReferenceNumber });
    setValue(name, letterNumberId, { shouldValidate: true });
    // Nomor yang baru terbit belum ada di cache "tersedia" -- segarkan
    // supaya kalau user membuka dropdown lagi, nomor itu ikut terlihat.
    fetchAvailable();
    setOpenIssueModal(false);
  };

  return (
    <div>
      <label className='block mb-2 font-medium text-gray-700'>
        {label} {isRequired && <span className='text-red-500'>*</span>}
      </label>
      <Select
        name={name}
        options={options}
        placeholder='Cari & pilih nomor surat yang tersedia'
        onChange={handleChange}
        isClearable
        isSearchable
        value={selected}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: '42px',
            borderColor: '#d1d5db',
            '&:hover': {
              borderColor: '#9ca3af',
            },
          }),
        }}
      />
      <button
        type='button'
        onClick={() => setOpenIssueModal(true)}
        className='mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#0D4690] hover:text-[#08326b] cursor-pointer'
      >
        <Plus size={12} /> Terbitkan Nomor Baru
      </button>

      <AddModalLetterNumbering
        isOpen={openIssueModal}
        onClose={() => setOpenIssueModal(false)}
        onSuccess={handleIssueSuccess}
        lockedTypeId={typeId}
        variant='stacked'
      />
    </div>
  );
}
