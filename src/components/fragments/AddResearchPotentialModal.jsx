import React, { useEffect, useState } from 'react';
import TextField from '../elements/formfields/TextField';
import MultiSelectDropdown from '../elements/formfields/MultiSelectDropdown';
import SwotFields from '../elements/formfields/SwotFields';
import ContactFields from '../elements/formfields/ContactFields';
import { useForm } from 'react-hook-form';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddResearchPotential } from '../../states/features/research/potential/potentialThunks';
import {
  asyncGetInstitutionsOptions,
  asyncGetInstitutionsOptionsById,
} from '../../states/features/institution/institutionThunks';
import {
  selectInstitutionsOptions,
  selectInstitutionsOptionsDetail,
} from '../../states/features/institution/institutionSelectors';
import Select from 'react-select';
import { X, Loader2 } from 'lucide-react';

export default function AddResearchPotentialModal({
  isOpen,
  onClose,
  accessTypeId,
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      partnershipResearchNeedsIds: [],
      partnershipResearchProgramIds: [],
      institutionId: null,
      contactName: '',
      contactPhoneNumber: '',
      contactEmail: '',
      contactStatus: null,
      strengths: '',
      weakness: '',
      opportunities: '',
      challenges: '',
      documentUrl: '',
    },
  });

  // Register Select field for validation
  useEffect(() => {
    register('institutionId', { required: true });
  }, [register]);

  const onSubmit = (data) => {
    console.log('Form data:', data);
    setIsSubmitting(true);
    dispatch(
      asyncAddResearchPotential({ ...data, query, typeId: accessTypeId }),
    )
      .unwrap()
      .then(() => onClose())
      .catch((err) => console.error(err))
      .finally(() => setIsSubmitting(false));
  };

  const [query, setQuery] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const institutionsOptions = useSelector(selectInstitutionsOptions);
  const institutionsOptionsDetail = useSelector(
    selectInstitutionsOptionsDetail,
  );

  useEffect(() => {
    if (institutionsOptionsDetail) {
      setValue(
        'instituteProfile',
        institutionsOptionsDetail.institutionProfile || '',
      );
      setValue(
        'institutionLocations',
        institutionsOptionsDetail.institutionLocations || [],
      );
      setValue(
        'institutionClusterFocus',
        institutionsOptionsDetail.institutionClusterFocus || '',
      );
      setValue(
        'institutionClusterType',
        institutionsOptionsDetail.institutionClusterType || '',
      );
    }
  }, [institutionsOptionsDetail, setValue]);

  const selectOptions = institutionsOptions.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  useEffect(() => {
    dispatch(asyncGetInstitutionsOptions({ query, typeId: accessTypeId }));
  }, [dispatch, query, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className='fixed inset-0 z-40 bg-black opacity-40'
        onClick={onClose}
      />
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div
          className='bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden flex flex-col'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='px-5 py-4 flex items-center justify-between border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Form Tambah Mitra
              {(accessTypeId === 1 && ' Universitas') ||
                (accessTypeId === 2 && ' Lembaga/Komunitas')}
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-lg'
              aria-label='Close'
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='px-5 py-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto'
          >
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-700'>
                Nama Instansi <span className='text-red-500'>*</span>
              </label>
              <Select
                name='institutionId'
                options={selectOptions}
                placeholder='Cari & pilih nama instansi'
                onInputChange={setQuery}
                onChange={(option) => {
                  setSelectedInstitution(option);
                  setValue('institutionId', option ? option.value : null, {
                    shouldValidate: true,
                  });
                  if (option) {
                    dispatch(
                      asyncGetInstitutionsOptionsById({ id: option.value }),
                    );
                  }
                }}
                isClearable
                isSearchable
                value={selectedInstitution}
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

            {Array.isArray(watch('institutionLocations')) &&
            watch('institutionLocations').length > 0 ? (
              watch('institutionLocations').map((loc, idx) => (
                <div
                  key={idx}
                  className='grid grid-cols-1 md:grid-cols-2 gap-3'
                >
                  <TextField
                    name={`institutionLocations.${idx}.provincieName`}
                    label={`Provinsi ${idx + 1}`}
                    placeholder='Masukkan provinsi'
                    register={register}
                    disable
                  />
                  <TextField
                    name={`institutionLocations.${idx}.regencieName`}
                    label={`Kab/Kota ${idx + 1}`}
                    placeholder='Masukkan kabupaten/kota'
                    register={register}
                    disable
                  />
                </div>
              ))
            ) : (
              <div className='text-sm text-gray-500 italic'>
                Lokasi institusi belum tersedia.
              </div>
            )}

            {accessTypeId === 2 && (
              <>
                {watch('institutionClusterFocus') ||
                watch('institutionClusterType') ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <TextField
                      name='institutionClusterFocus'
                      label='Cluster Focus'
                      placeholder='Masukkan cluster focus'
                      register={register}
                      disable
                    />
                    <TextField
                      name='institutionClusterType'
                      label='Cluster Type'
                      placeholder='Masukkan cluster type'
                      register={register}
                      disable
                    />
                  </div>
                ) : (
                  <div className='text-sm text-gray-500 italic'>
                    Cluster Focus dan Cluster Type belum tersedia.
                  </div>
                )}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  <TextField
                    name='peran'
                    label='Peran'
                    placeholder='Masukkan peran'
                    register={register}
                    isRequired={true}
                  />
                  <TextField
                    name='wilayah jangkauan'
                    label='Wilayah Jangkauan'
                    placeholder='Masukkan wilayah jangkauan'
                    register={register}
                    isRequired={true}
                  />
                </div>
              </>
            )}

            {watch('instituteProfile') ? (
              <TextField
                name='instituteProfile'
                label='Profil'
                placeholder='Masukkan profil'
                register={register}
                disable
              />
            ) : (
              <div>
                <label className='block mb-1 font-medium'>Profil</label>
                <div className='w-full border border-gray-200 bg-gray-50 px-3 py-2 rounded text-sm text-gray-500 italic cursor-not-allowed'>
                  Profil belum terisi
                </div>
              </div>
            )}

            <ContactFields
              register={register}
              isRequired={true}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <MultiSelectDropdown
                name='partnershipResearchProgramIds'
                label='Program LSD'
                options={[
                  { id: 1, label: 'LEAD' },
                  { id: 2, label: 'CLP' },
                  { id: 3, label: 'HOL' },
                ]}
                register={register}
                setValue={setValue}
                isRequired={true}
              />
              <SingleSelectDropdownBadge
                name='contactStatus'
                label='Status'
                options={[
                  { id: 1, label: 'Sudah dikontak' },
                  { id: 0, label: 'Belum dikontak' },
                ]}
                register={register}
                setValue={setValue}
                isRequired={true}
              />
            </div>

            <MultiSelectDropdown
              name='partnershipResearchNeedsIds'
              label='Kebutuhan'
              options={[
                { id: 1, label: 'Surat Undangan Audiensi' },
                { id: 2, label: 'Surat Permohonan Kerjasama' },
              ]}
              register={register}
              setValue={setValue}
              isRequired={true}
            />

            <SwotFields
              label='Program Analisis'
              register={register}
              isRequired={true}
            />

            <TextField
              name='documentUrl'
              label='Link Dokumen'
              placeholder='https://..'
              register={register}
              isRequired={true}
            />

            {/* Footer with Buttons */}
            <div className='flex justify-end gap-3 pt-2 border-t border-gray-200 mt-4'>
              <button
                type='button'
                onClick={onClose}
                disabled={isSubmitting}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Batal
              </button>
              <button
                type='submit'
                disabled={isSubmitting || !isValid}
                className='px-4 py-2 text-sm font-medium text-white bg-[#0D4690] rounded-lg hover:bg-blue-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center'
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={16}
                      className='animate-spin'
                    />
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
