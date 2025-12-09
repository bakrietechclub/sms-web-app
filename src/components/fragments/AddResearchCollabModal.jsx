import React, { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import SwotFields from '../elements/formfields/SwotFields';
import TextField from '../elements/formfields/TextField';
import MultiSelectDropdown from '../elements/formfields/MultiSelectDropdown';
import AgreementStatus from '../elements/formfields/AgreementStatus';
import { asyncAddResearchCollab } from '../../states/features/research/collab/collabThunks';
import {
  selectPotentialOptionDetail,
  selectPotentialsOptions,
  selectPotentialsOptionsDetail,
} from '../../states/features/research/potential/potentialSelectors';
import {
  asyncGetDetailResearchPotentialOptionsById,
  asyncGetResearchPotentialOptions,
  asyncGetResearchPotentialOptionsById,
} from '../../states/features/research/potential/potentialThunks';
import { Link } from 'react-router-dom';
import { X, Loader2 } from 'lucide-react';

// Define initial default values outside the component
const defaultFormValues = {
  researchId: null,
  researchPksId: null,
  researchNeedsIds: [],
  researchProgramIds: [],
  detailCollab: '',
  strengths: '',
  weakness: '',
  opportunities: '',
  challenge: '',
  institutionRegion: '',
  potentialPrograms: '',
  statusPartnership: '',
  MoU: '',
  PkS: '',
};

export default function AddResearchCollabModal({
  isOpen,
  onClose,
  accessTypeId,
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [query, setQuery] = useState('');

  // Use watch to get the current values needed for Select components
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: defaultFormValues,
  });

  const researchId = watch('researchId');
  const researchPksId = watch('researchPksId');

  // Redux Selectors
  const potentialOptions = useSelector(selectPotentialsOptions);
  const potentialOptionsDetail = useSelector(selectPotentialsOptionsDetail);
  const potentialOptionDetail = useSelector(selectPotentialOptionDetail);

  // --- Memoization and Transformation ---

  // Transform options into Select format
  const selectOptions = useMemo(() => {
    return potentialOptions.map((item) => ({
      value: item.id,
      label: item.label,
    }));
  }, [potentialOptions]);

  const selectOptionsDetail = useMemo(() => {
    return potentialOptionsDetail?.map((item) => ({
      value: item.id,
      label: item.label,
    }));
  }, [potentialOptionsDetail]);

  // Determine the currently selected options for the Select components' 'value' prop
  const selectedInstitutionOption = useMemo(() => {
    return selectOptions.find((option) => option.value === researchId) || null;
  }, [selectOptions, researchId]);

  const selectedInstitutionDetailOption = useMemo(() => {
    return (
      selectOptionsDetail?.find((option) => option.value === researchPksId) ||
      null
    );
  }, [selectOptionsDetail, researchPksId]);

  // --- Side Effects (Data Fetching and Form Value Setting) ---

  // 1. Fetch institution options when the modal opens or query/typeId changes
  useEffect(() => {
    if (isOpen) {
      dispatch(
        asyncGetResearchPotentialOptions({ query, typeId: accessTypeId })
      );
    }
  }, [dispatch, query, isOpen, accessTypeId]);

  // 2. Update form fields when potentialOptionDetail changes (after selecting a PkS/Division)
  useEffect(() => {
    if (potentialOptionDetail) {
      setValue(
        'institutionRegion',
        potentialOptionDetail.institutionRegion ?? ''
      );
      setValue(
        'potentialPrograms',
        potentialOptionDetail.potentialPrograms ?? ''
      );
      setValue(
        'statusPartnership',
        potentialOptionDetail.statusPartnership ?? ''
      );
      // MoU fields
      setValue(
        'MoU.signatureDate',
        potentialOptionDetail.MoU?.signatureDate ?? ''
      );
      setValue('MoU.dueDate', potentialOptionDetail.MoU?.dueDate ?? '');
      setValue('MoU.documentUrl', potentialOptionDetail.MoU?.documentUrl ?? '');

      // PkS fields
      setValue(
        'PkS.signatureDate',
        potentialOptionDetail.PkS?.signatureDate ?? ''
      );
      setValue('PkS.dueDate', potentialOptionDetail.PkS?.dueDate ?? '');
      setValue('PkS.documentUrl', potentialOptionDetail.PkS?.documentUrl ?? '');
    } else {
      // Clear fields if potentialOptionDetail becomes null
      setValue('institutionRegion', '');
      setValue('potentialPrograms', '');
      setValue('statusPartnership', '');
      setValue('MoU.signatureDate', '');
      setValue('MoU.dueDate', '');
      setValue('MoU.documentUrl', '');
      setValue('PkS.signatureDate', '');
      setValue('PkS.dueDate', '');
      setValue('PkS.documentUrl', '');
    }
  }, [potentialOptionDetail, setValue]);

  // --- Handlers ---

  const onSubmit = (data) => {
    console.log('Form data:', data);
    setIsSubmitting(true);
    dispatch(
      asyncAddResearchCollab({ ...data, query, typeId: accessTypeId })
    )
      .unwrap()
      .then(() => onClose())
      .catch((err) => console.error(err))
      .finally(() => setIsSubmitting(false));
  };

  const handleInstitutionChange = (option) => {
    setValue('researchId', option ? option.value : null);
    setValue('researchPksId', null);
    setValue('institutionRegion', '');
    setValue('potentialPrograms', '');
    setValue('statusPartnership', '');
    setValue('MoU.signatureDate', '');
    setValue('MoU.dueDate', '');
    setValue('MoU.documentUrl', '');
    setValue('PkS.signatureDate', '');
    setValue('PkS.dueDate', '');
    setValue('PkS.documentUrl', '');
    if (option) {
      dispatch(asyncGetResearchPotentialOptionsById({ id: option.value }));
    }
  };

  const handleInstitutionDetailChange = (option) => {
    setValue('researchPksId', option ? option.value : null);
    if (option) {
      dispatch(
        asyncGetDetailResearchPotentialOptionsById({ id: option.value })
      );
    }
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
              Tambah Data Riset Kolaborasi Mitra
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
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Nama Instansi <span className="text-red-500">*</span>
              </label>
              <Select
                name="researchId"
                options={selectOptions}
                placeholder="Cari & pilih nama instansi"
                onInputChange={setQuery}
                onChange={handleInstitutionChange}
                isClearable
                isSearchable
                value={selectedInstitutionOption}
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
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Divisi Instansi <span className="text-red-500">*</span>
              </label>
              <Select
                name="researchPksId"
                options={selectOptionsDetail}
                placeholder="Cari & pilih nama Divisi Instansi"
                onChange={handleInstitutionDetailChange}
                isClearable
                isSearchable
                value={selectedInstitutionDetailOption}
                isDisabled={!researchId}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <TextField
                name="institutionRegion"
                label="Provinsi"
                disable
                placeholder="Provinsi Instansi"
                register={register}
              />
              <TextField
                name="potentialPrograms"
                label="Program LSD"
                disable
                placeholder="Program yang bekerja sama"
                register={register}
              />
              <TextField
                name="statusPartnership"
                label="Status Kerjasama"
                disable
                placeholder="Status Kerjasama"
                register={register}
              />
            </div>

            <AgreementStatus register={register} />

            <div className="flex items-center gap-3 py-2">
              <label className="text-sm font-medium text-gray-700">Kontak</label>
              <Link
                to={`/dashboard/groups/${researchId}`}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0D4690] rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
              >
                Lihat
              </Link>
            </div>

            <MultiSelectDropdown
              name="researchNeedsIds"
              label="Kebutuhan"
              options={[
                { id: 1, label: 'Surat Undangan Audiensi' },
                { id: 2, label: 'Surat Permohonan Kerjasama' },
                { id: 5, label: 'SPK (Surat Pernyataan Komitmen)' },
                { id: 6, label: 'TOR (Term Of Reference)' },
              ]}
              register={register}
              setValue={setValue}
              isRequired={true}
            />

            <MultiSelectDropdown
              name="researchProgramIds"
              label="Program LSD Rencana Kolaborasi"
              options={[
                { id: 1, label: 'LEAD' },
                { id: 2, label: 'CLP' },
                { id: 3, label: 'HOL' },
              ]}
              register={register}
              setValue={setValue}
            />

            <TextField
              name="detailCollab"
              label="Detail Rencana Kolaborasi"
              placeholder="Detail Rencana Kolaborasi"
              register={register}
            />

            <SwotFields
              label="Analisis Kolaborasi Program"
              register={register}
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
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0D4690] rounded-lg hover:bg-blue-800 transition-colors cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
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

