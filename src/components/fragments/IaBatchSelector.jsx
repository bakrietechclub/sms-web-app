import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import api from '../../utils/api';

/**
 * Dropdown gabungan Program+Batch untuk form IA, mengikuti pola
 * BatchSelector di web-app-clp/src/Components/BatchSelector.js: satu Batch
 * (mis. "CLP Batch 8") bisa menaungi beberapa program turunan (Internship
 * MSIB Reguler, Internship Mandiri, Praktikum, dst) yang kalau ditampilkan
 * sebagai nomor batch polos akan terlihat sama persis satu sama lain.
 * Dikelompokkan per Program (grup) supaya tetap satu dropdown tapi tidak
 * ambigu -- value yang dipilih (`batchId`) merujuk ke md_batch.id, dan
 * `programId` (second tier, mis. CLP) ikut diturunkan dari situ.
 *
 * @param {object} props
 * @param {number|string} props.value - batchId (md_batch.id) yang aktif.
 * @param {function} props.onChange - dipanggil dengan { batchId, programId }.
 */
export const IaBatchSelector = ({ value, onChange, placeholder = 'Cari & pilih batch' }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getIABatchOptions()
      .then((data) => setGroups(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const groupedOptions = useMemo(
    () =>
      groups.map((group) => ({
        label: `${group.mainProgramName} - Batch ${group.mainBatchName}`,
        options: (group.subBatches || []).map((sub) => ({
          value: sub.batchId,
          programId: sub.programId,
          label: `${sub.programName} - Batch ${sub.batchName}`,
          statusOffered: sub.statusOffered,
        })),
      })),
    [groups],
  );

  const flatOptions = useMemo(
    () => groupedOptions.reduce((acc, group) => [...acc, ...group.options], []),
    [groupedOptions],
  );

  const selectedOption =
    flatOptions.find((opt) => String(opt.value) === String(value)) || null;

  const formatOptionLabel = ({ label, statusOffered }) => (
    <div className='flex items-center justify-between gap-3 w-full'>
      <span className='truncate'>{label}</span>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
          statusOffered
            ? 'bg-[#DFF2E3] text-[#28a745]'
            : 'bg-[#e6e6e6] text-[#999999]'
        }`}
      >
        {statusOffered ? 'Dibuka' : 'Ditutup'}
      </span>
    </div>
  );

  return (
    <Select
      options={groupedOptions}
      value={selectedOption}
      onChange={(option) =>
        onChange(
          option
            ? { batchId: option.value, programId: option.programId }
            : { batchId: null, programId: null },
        )
      }
      isLoading={loading}
      isClearable
      isSearchable
      placeholder={placeholder}
      formatOptionLabel={formatOptionLabel}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: '42px',
          borderColor: '#d1d5db',
          '&:hover': { borderColor: '#9ca3af' },
        }),
        groupHeading: (base) => ({
          ...base,
          color: '#0D4690',
          fontWeight: 700,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
        }),
      }}
    />
  );
};

export default IaBatchSelector;
