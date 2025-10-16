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
  institutionRegion: '', // Added for useEffect cleanup
  potentialPrograms: '', // Added for useEffect cleanup
  statusPartnership: '', // Added for useEffect cleanup
  MoU: '', // Added for useEffect cleanup
  PkS: '', // Added for useEffect cleanup
};

export default function AddResearchCollabModal({
  isOpen,
  onClose,
  accessTypeId,
}) {
  const dispatch = useDispatch();

  // Use watch to get the current values needed for Select components
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: defaultFormValues,
  });

  const researchId = watch('researchId');
  const researchPksId = watch('researchPksId');

  // Local state for search query remains to control API calls for institution options
  const [query, setQuery] = useState('');

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
    // This effect runs whenever potentialOptionDetail is updated by Redux
    if (potentialOptionDetail) {
      // Use a consistent way to set values. Nullish coalescing is good for fallbacks.
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
      // --- UPDATED FOR NESTED MOU/PKS ---
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
      // ------------------------------------
    } else {
      // Clear fields if potentialOptionDetail becomes null (e.g., on clear/new selection)
      setValue('institutionRegion', '');
      setValue('potentialPrograms', '');
      setValue('statusPartnership', '');
      // --- UPDATED FOR NESTED MOU/PKS CLEARING ---
      setValue('MoU.signatureDate', '');
      setValue('MoU.dueDate', '');
      setValue('MoU.documentUrl', '');
      setValue('PkS.signatureDate', '');
      setValue('PkS.dueDate', '');
      setValue('PkS.documentUrl', '');
      // -------------------------------------------
    }
  }, [potentialOptionDetail, setValue]);

  // --- Handlers ---

  const onSubmit = (data) => {
    console.log('Form data:', data);
    // Uncomment and use the thunk once ready
    // dispatch(asyncAddResearchCollab(data))
    //   .unwrap()
    //   .then(() => onClose())
    //   .catch((err) => console.error(err));
  };

  const handleInstitutionChange = (option) => {
    // 1. Set the form value for researchId
    setValue('researchId', option ? option.value : null);
    // 2. Clear researchPksId and its related detail fields
    setValue('researchPksId', null);
    setValue('institutionRegion', '');
    setValue('potentialPrograms', '');
    setValue('statusPartnership', '');
    // 4. **IMMEDIATELY CLEAR ALL NESTED MOU/PKS FIELDS** (Updated)
    setValue('MoU.signatureDate', '');
    setValue('MoU.dueDate', '');
    setValue('MoU.documentUrl', '');
    setValue('PkS.signatureDate', '');
    setValue('PkS.dueDate', '');
    setValue('PkS.documentUrl', '');
    // 3. Trigger API call for detail options if an institution is selected
    if (option) {
      dispatch(asyncGetResearchPotentialOptionsById({ id: option.value }));
    }
  };

  const handleInstitutionDetailChange = (option) => {
    // 1. Set the form value for researchPksId
    setValue('researchPksId', option ? option.value : null);
    // 2. Trigger API call for detailed potential information
    if (option) {
      dispatch(
        asyncGetDetailResearchPotentialOptionsById({ id: option.value })
      );
    }
  };

  if (!isOpen) return null;

  // --- Render ---

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black opacity-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white w-[1116px] h-[900px] max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-[92px] px-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Tambah Data Riset Kolaborasi Mitra
            </h2>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pt-2 pb-4 space-y-4 overflow-y-auto"
            style={{ height: 'calc(900px - 92px)' }}
          >
            <label className="block mb-1 font-medium">
              Nama Instansi <span className="text-red-500">*</span>
            </label>
            <Select
              name="researchId" // Keep name for accessibility/debugging, but value is controlled by form state
              options={selectOptions}
              placeholder="Cari & pilih nama instansi"
              onInputChange={setQuery}
              onChange={handleInstitutionChange}
              isClearable
              isSearchable
              value={selectedInstitutionOption} // Controlled by watch('researchId')
            />

            <label className="block mb-1 font-medium">
              Divisi Instansi <span className="text-red-500">*</span>
            </label>
            <Select
              name="researchPksId"
              options={selectOptionsDetail}
              placeholder="Cari & pilih nama Divisi Instansi"
              onChange={handleInstitutionDetailChange}
              isClearable
              isSearchable
              value={selectedInstitutionDetailOption} // Controlled by watch('researchPksId')
              isDisabled={!researchId} // Disable if no institution is selected
            />

            {/* Fields controlled by the Redux detail state */}
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

            {/* AgreementStatus likely contains fields for MoU and PkS, which are set via useEffect */}
            <AgreementStatus register={register} />

            {/* Assuming 'kontak' is not coming from the potential detail and should be manually inputted or is part of AgreementStatus */}
            {/* <TextField
              name="kontak"
              label="Kontak"
              disable
              placeholder="kontak"
              register={register}
              // The 'disable' prop was present in the original, but it wasn't clear if it should be disabled like the others.
              // I'm assuming it's an input for new contact info, so I'll leave 'disable' out.
            /> */}

            <div className="mb-4 flex items-center gap-4">
              <label className="block mb-1 font-medium">Kontak </label>
              <Link
                to={`/dashboard/groups/${researchId}`}
                className="bg-[#0d4690] text-white px-15 py-2 rounded-lg hover:bg-[#0c3f82]"
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
            <div className="text-right pt-4">
              <button
                type="submit"
                className="bg-[#0d4690] text-white px-15 py-2 rounded-lg hover:bg-[#0c3f82]"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
