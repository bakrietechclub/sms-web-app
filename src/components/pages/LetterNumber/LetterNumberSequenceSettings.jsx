import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, History, Loader2 } from 'lucide-react';
import { Button } from '../../elements/Button';
import { Pagination } from '../../fragments/Pagination';
import AlertModal from '../../fragments/AlertModal';
import {
  getLetterSequence,
  updateLetterSequence,
  getLetterSequenceAuditLog,
} from '../../../utils/api/letter';

// Halaman ini SENGAJA terpisah dari /letter-numbers (bukan modal, bukan
// tab) -- ini pengaturan yang jarang dipakai dan berdampak besar
// (letter_number_sequence adalah kaunter GLOBAL, dibagi dengan CLP: nomor
// rekomendasi HOL dan sertifikat CLP menerbitkan nomor dari deret yang
// SAMA dengan MoU/PKS/TOR/SPK/IA di SMS). Memberinya halaman sendiri +
// friksi ekstra (alasan wajib, konfirmasi dua langkah) adalah desain
// sengaja, bukan kurang dipoles -- ini bukan pengaturan yang seharusnya
// gampang dan cepat diubah sambil lalu.
export default function LetterNumberSequenceSettings() {
  const navigate = useNavigate();

  const [sequence, setSequence] = useState(null);
  const [isLoadingSequence, setIsLoadingSequence] = useState(true);

  const [newValue, setNewValue] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resultAlert, setResultAlert] = useState(null); // { variant, message }

  const [auditLog, setAuditLog] = useState({ result: [], totalPages: 1 });
  const [auditPage, setAuditPage] = useState(1);
  const [isLoadingAudit, setIsLoadingAudit] = useState(true);

  const fetchSequence = useCallback(async () => {
    setIsLoadingSequence(true);
    try {
      const data = await getLetterSequence();
      setSequence(data);
      setNewValue(String(data.currentValue));
    } catch (err) {
      setResultAlert({ variant: 'error', message: err.message || 'Gagal memuat data.' });
    } finally {
      setIsLoadingSequence(false);
    }
  }, []);

  const fetchAuditLog = useCallback(async (page) => {
    setIsLoadingAudit(true);
    try {
      const data = await getLetterSequenceAuditLog({ page, pageSize: 10 });
      setAuditLog(data);
    } catch (err) {
      // Riwayat gagal dimuat bukan alasan menghalangi halaman utama --
      // cukup tampilkan tabel kosong, jangan blokir form di atasnya.
      setAuditLog({ result: [], totalPages: 1 });
    } finally {
      setIsLoadingAudit(false);
    }
  }, []);

  useEffect(() => {
    fetchSequence();
  }, [fetchSequence]);

  useEffect(() => {
    fetchAuditLog(auditPage);
  }, [fetchAuditLog, auditPage]);

  const parsedNewValue = Number(newValue);
  const isValueValid =
    newValue !== '' &&
    Number.isInteger(parsedNewValue) &&
    parsedNewValue >= (sequence?.maxIssuedLetterNumber ?? 0);
  const isReasonValid = reason.trim().length >= 10;
  const hasActualChange = sequence && parsedNewValue !== sequence.currentValue;
  const canSubmit = isValueValid && isReasonValid && hasActualChange && !isSubmitting;

  const handleConfirmedSubmit = async () => {
    setIsSubmitting(true);
    setShowConfirm(false);
    try {
      const response = await updateLetterSequence({ newValue: parsedNewValue, reason: reason.trim() });
      setResultAlert({
        variant: 'success',
        message: response.message || 'Nomor urut global berhasil diubah.',
      });
      setReason('');
      await fetchSequence();
      setAuditPage(1);
      await fetchAuditLog(1);
    } catch (err) {
      setResultAlert({ variant: 'error', message: err.message || 'Gagal mengubah nomor urut.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-3xl'>
      <button
        type='button'
        onClick={() => navigate('/letter-numbers')}
        className='inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4'
      >
        <ArrowLeft size={16} />
        Kembali ke Penomoran Surat
      </button>

      <h1 className='text-2xl font-semibold'>Pengaturan Nomor Urut Global</h1>
      <p className='text-sm text-gray-500 mt-1 mb-4'>
        Mengatur nomor urut dasar yang dipakai untuk menerbitkan nomor surat berikutnya.
      </p>

      <div className='flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 mb-6'>
        <AlertTriangle className='text-amber-500 shrink-0 mt-0.5' size={18} />
        <p className='text-sm text-amber-800'>
          <strong>Ini kaunter global, bukan pengaturan khusus SMS.</strong> Nomor surat
          rekomendasi HOL dan sertifikat CLP juga diterbitkan dari deret nomor yang sama dengan
          MoU/PKS/TOR/SPK/IA di sini. Mengubah nilai ini memengaruhi nomor surat berikutnya di
          seluruh sistem tersebut, bukan cuma modul Kemitraan.
        </p>
      </div>

      {isLoadingSequence ? (
        <div className='flex items-center gap-2 text-gray-400 text-sm py-8'>
          <Loader2 className='animate-spin' size={16} /> Memuat data...
        </div>
      ) : (
        <>
          <div className='grid grid-cols-3 gap-3 mb-6'>
            <div className='rounded-lg border border-gray-200 p-4'>
              <p className='text-xs text-gray-400 uppercase font-medium mb-1'>Nomor Urut Saat Ini</p>
              <p className='text-xl font-semibold text-gray-800'>{sequence?.currentValue}</p>
            </div>
            <div className='rounded-lg border border-gray-200 p-4'>
              <p className='text-xs text-gray-400 uppercase font-medium mb-1'>Terakhir Diterbitkan</p>
              <p className='text-xl font-semibold text-gray-800'>{sequence?.maxIssuedLetterNumber}</p>
            </div>
            <div className='rounded-lg border border-gray-200 p-4 bg-[#F5F9FF]'>
              <p className='text-xs text-[#0D4690] uppercase font-medium mb-1'>Nomor Berikutnya</p>
              <p className='text-xl font-semibold text-[#0D4690]'>{sequence?.nextNumber}</p>
            </div>
          </div>

          <div className='rounded-lg border border-gray-200 p-5 mb-8'>
            <h2 className='text-sm font-semibold text-gray-700 mb-4'>Ubah Nomor Urut</h2>

            <label className='block mb-1 text-sm font-medium text-gray-700'>
              Nomor Urut Baru <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              value={newValue}
              min={sequence?.maxIssuedLetterNumber ?? 0}
              onChange={(e) => setNewValue(e.target.value)}
              className='w-full border border-gray-300 px-3 py-2 rounded mb-1'
            />
            {!isValueValid && newValue !== '' && (
              <p className='text-xs text-red-500 mb-2'>
                Tidak boleh lebih kecil dari nomor yang sudah pernah diterbitkan
                ({sequence?.maxIssuedLetterNumber}) -- itu akan membuat nomor surat berikutnya
                bertabrakan dengan surat yang sudah ada.
              </p>
            )}

            <label className='block mb-1 mt-3 text-sm font-medium text-gray-700'>
              Alasan Perubahan <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder='Contoh: Rekonsiliasi dengan arsip surat fisik per September 2026'
              rows={3}
              className='w-full border border-gray-300 px-3 py-2 rounded resize-none mb-1'
            />
            <p className='text-xs text-gray-400 mb-4'>
              Wajib diisi (minimal 10 karakter) -- tercatat di riwayat perubahan di bawah, dan
              boleh dibaca siapa pun yang punya akses ke halaman ini.
            </p>

            <Button
              type='button'
              disabled={!canSubmit}
              onClick={() => setShowConfirm(true)}
              className='bg-[#0D4690] text-white px-4 py-2 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors flex items-center gap-2'
            >
              {isSubmitting && <Loader2 className='animate-spin' size={14} />}
              Simpan Perubahan
            </Button>
          </div>
        </>
      )}

      <div className='rounded-lg border border-gray-200'>
        <div className='flex items-center gap-2 px-5 py-3 border-b border-gray-200'>
          <History size={16} className='text-gray-400' />
          <h2 className='text-sm font-semibold text-gray-700'>Riwayat Perubahan</h2>
        </div>
        {isLoadingAudit ? (
          <div className='flex items-center gap-2 text-gray-400 text-sm px-5 py-6'>
            <Loader2 className='animate-spin' size={16} /> Memuat riwayat...
          </div>
        ) : auditLog.result.length === 0 ? (
          <p className='text-sm text-gray-400 px-5 py-6'>
            Belum pernah ada penyesuaian manual pada nomor urut ini.
          </p>
        ) : (
          <>
            <table className='w-full text-sm'>
              <thead className='bg-gray-50 text-gray-500 text-xs uppercase'>
                <tr>
                  <th className='text-left px-5 py-2 font-medium'>Waktu</th>
                  <th className='text-left px-5 py-2 font-medium'>Diubah Oleh</th>
                  <th className='text-left px-5 py-2 font-medium'>Perubahan</th>
                  <th className='text-left px-5 py-2 font-medium'>Alasan</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.result.map((row) => (
                  <tr key={row.id} className='border-t border-gray-100'>
                    <td className='px-5 py-3 text-gray-600 whitespace-nowrap'>
                      {new Date(row.createdAt).toLocaleString('id-ID', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </td>
                    <td className='px-5 py-3 text-gray-600'>{row.changedByName || '-'}</td>
                    <td className='px-5 py-3 text-gray-800 font-medium whitespace-nowrap'>
                      {row.oldValue} &rarr; {row.newValue}
                    </td>
                    <td className='px-5 py-3 text-gray-600'>{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='px-5 py-3'>
              <Pagination
                currentPage={auditPage}
                totalPages={auditLog.totalPages}
                onPageChange={setAuditPage}
              />
            </div>
          </>
        )}
      </div>

      <AlertModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        variant='confirm'
        title='Konfirmasi Perubahan Nomor Urut Global'
        message={`Anda akan mengubah nomor urut dari ${sequence?.currentValue} menjadi ${parsedNewValue}. Nomor surat BERIKUTNYA di seluruh sistem (SMS, CLP, HOL) akan mengikuti nilai baru ini. Lanjutkan?`}
        confirmText='Ya, Ubah Sekarang'
        onConfirm={handleConfirmedSubmit}
        isConfirming={isSubmitting}
      />

      <AlertModal
        isOpen={!!resultAlert}
        onClose={() => setResultAlert(null)}
        variant={resultAlert?.variant}
        message={resultAlert?.message}
      />
    </div>
  );
}
