import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { X, Loader2 } from 'lucide-react';

import TextField from '../elements/formfields/TextField';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import DatePickerField from '../elements/formfields/DatePickerField';
import { Button } from '../elements/Button';
import { STATUS_OPTIONS } from '../../utils';
import { asyncUpdateTorById } from '../../states/features/partnerships/tor/torThunks';

export default function UpdateTorModal({ isOpen, onClose, initialData, onSuccess }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, formState: { isValid }, reset } = useForm({
    mode: 'onChange',
  });

  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Check if matches DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    }
    return dateString;
  };

  useEffect(() => {
    if (initialData) {
      // Map status label to ID if only label is provided
      const statusId = initialData.partnershipStatusId || STATUS_OPTIONS.find(opt => opt.label === initialData?.torPartnershipStatus)?.id || 1;

      reset({
        partnershipStatusId: statusId,
        torDetailPartnership: initialData.torDetailPartnership || '',
        torNameOfPartner: initialData.torNameOfPartner || '',
        torNameofBcf: initialData.torNameofBcf || '',
        torSignatureDate: formatDate(initialData.torSignatureDate) || '',
        torTimePeriod: initialData.torTimePeriod || 5, // Default
        torDueDate: formatDate(initialData.torDueDate) || '',
        torDocumentUrl: initialData.torDocumentUrl || '',
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      torTimePeriod: Number(data.torTimePeriod),
    };

    dispatch(asyncUpdateTorById({ id: initialData.torId || initialData.id, payload }))
      .unwrap()
      .then(() => {
        onSuccess?.();
        onClose();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsSubmitting(false));
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Perbarui Data Tor
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-lg"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-5 py-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto"
          >
            <TextField
              name="torDetailPartnership"
              label="Detail Kerjasama"
              placeholder="Masukkan detail kerjasama"
              register={register}
              isRequired={true}
            />

            <SingleSelectDropdownBadge
              name="partnershipStatusId"
              label="Status TOR"
              options={STATUS_OPTIONS}
              register={register}
              setValue={setValue}
              isRequired
              defaultValue={initialData?.partnershipStatusId || STATUS_OPTIONS.find(opt => opt.label === initialData?.torPartnershipStatus)?.id}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <TextField
                name="torNameofBcf"
                label="Nama Pihak BCF"
                placeholder="Masukkan nama pihak BCF"
                register={register}
                isRequired={true}
              />
              <TextField
                name="torNameOfPartner"
                label="Nama Pihak Mitra"
                placeholder="Masukkan nama pihak mitra"
                register={register}
                isRequired={true}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <DatePickerField
                name="torSignatureDate"
                label="Tanggal Tanda Tangan"
                className="w-full"
                placeholder="Masukkan tanggal"
                register={register}
                setValue={setValue}
                isRequired={true}
              />
              <TextField
                name="torTimePeriod"
                label="Jangka Waktu"
                placeholder="Masukkan jangka waktu"
                register={register}
                isRequired={true}
                type="number"
              />
              <DatePickerField
                name="torDueDate"
                label="Jatuh Tempo"
                className="w-full"
                placeholder="Masukkan jatuh tempo"
                register={register}
                setValue={setValue}
                isRequired={true}
              />
            </div>

            <TextField
              name="torDocumentUrl"
              label="Link File ToR"
              placeholder="https://.."
              register={register}
              isRequired={true}
            />

            {/* Footer with Buttons */}
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-200 mt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0D4690] rounded-lg hover:bg-blue-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  'Simpan'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
