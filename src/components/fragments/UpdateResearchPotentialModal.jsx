import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  asyncUpdateResearchPotentialById,
} from '../../states/features/research/potential/potentialThunks';
import TextField from '../elements/formfields/TextField';
import MultiSelectDropdown from '../elements/formfields/MultiSelectDropdown';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import SwotFields from '../elements/formfields/SwotFields';
import ContactFields from '../elements/formfields/ContactFields';
import { X, Loader2 } from 'lucide-react';

const PROGRAM_OPTIONS = [
  { id: 1, label: 'LEAD', name: 'Lead Indonesia' },
  { id: 2, label: 'CLP', name: 'Campus Leaders Program' },
  { id: 3, label: 'HOL', name: 'Home of Leaders' },
];

const NEEDS_OPTIONS = [
  { id: 1, label: 'Surat Undangan Audiensi' },
  { id: 2, label: 'Surat Permohonan Kerjasama' },
];

const STATUS_OPTIONS = [
  { id: 1, label: 'Sudah dikontak' },
  { id: 0, label: 'Belum dikontak' },
];

export default function UpdateResearchPotentialModal({
  isOpen,
  onClose,
  researchPotentialId,
  initialData,
  accessTypeId,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, reset, watch, formState: { isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      partnershipResearchNeedsIds: [],
      partnershipResearchProgramIds: [],
      contactName: '',
      contactPhoneNumber: '',
      contactPosition: '',
      contactEmail: '',
      contactStatus: null,
      strengths: '',
      weakness: '',
      opportunities: '',
      challenges: '',
      documentUrl: '',
    },
  });

  // Derived default values for custom components
  const formattedDefaults = useMemo(() => {
    if (!initialData) return {};

    const programIds =
      initialData.partnershipResearchProgram
        ?.map(
          (p) =>
            PROGRAM_OPTIONS.find((o) => o.label === p || o.name === p)?.id
        )
        .filter(Boolean) || [];

    const needsIds =
      initialData.partnershipResearchNeeds
        ?.map((n) => NEEDS_OPTIONS.find((o) => o.label === n)?.id)
        .filter(Boolean) || [];

    const statusOption = STATUS_OPTIONS.find(
      (o) => o.label === initialData.contactStatus
    );
    const statusId = statusOption ? statusOption.id : null;

    return {
      programIds,
      needsIds,
      statusId,
    };
  }, [initialData]);

  // Sync initialData to Form
  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        // Contact
        contactName: initialData.contactName || '',
        contactPhoneNumber: initialData.contactPhoneNumber || '',
        contactPosition: initialData.contactPosition || '',
        contactEmail: initialData.contactEmail || '',

        // Logic
        partnershipResearchProgramIds: formattedDefaults.programIds,
        contactStatus: formattedDefaults.statusId,
        partnershipResearchNeedsIds: formattedDefaults.needsIds,

        // SWOT
        strengths: initialData.analysisStrenghts || initialData.strengths || '',
        weakness: initialData.analysisWeakness || '',
        opportunities: initialData.analysisOpportunities || '',
        challenges: initialData.analysisChallenge || '',

        // Docs
        documentUrl: initialData.urlDocument || '',
      });
    }
  }, [isOpen, initialData, reset, formattedDefaults]);

  const onSubmit = (data) => {
    setIsSubmitting(true);

    dispatch(asyncUpdateResearchPotentialById({ id: researchPotentialId, ...data }))
      .unwrap()
      .then(() => {
        if (onSuccess) onSuccess();
        onClose();
      })
      .catch((err) => console.error('Failed to update:', err))
      .finally(() => setIsSubmitting(false));
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-40 transition-opacity"
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
              Perbarui Mitra
              {(accessTypeId === 1 && ' Universitas') ||
                (accessTypeId === 2 && ' Lembaga/Komunitas')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-lg"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-5 py-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto"
          >
            {/* Contact Fields */}
            <ContactFields register={register} isRequired={true} />

            {/* Program & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <MultiSelectDropdown
                name="partnershipResearchProgramIds"
                label="Program LSD"
                options={PROGRAM_OPTIONS}
                register={register}
                setValue={setValue}
                defaultValue={formattedDefaults.programIds}
                isRequired={true}
              />
              <SingleSelectDropdownBadge
                name="contactStatus"
                label="Status"
                options={STATUS_OPTIONS}
                register={register}
                setValue={setValue}
                defaultValue={formattedDefaults.statusId}
                isRequired={true}
              />
            </div>

            {/* Needs */}
            <MultiSelectDropdown
              name="partnershipResearchNeedsIds"
              label="Kebutuhan"
              options={NEEDS_OPTIONS}
              register={register}
              setValue={setValue}
              defaultValue={formattedDefaults.needsIds}
              isRequired={true}
            />

            {/* SWOT */}
            <SwotFields label="Program Analisis" register={register} isRequired={true} />

            {/* Document */}
            <TextField
              name="documentUrl"
              label="Link Dokumen"
              placeholder="https://..."
              register={register}
              isRequired={true}
            />

            {/* Footer Buttons */}
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
