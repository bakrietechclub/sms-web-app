import React, { useEffect, useState } from 'react';
import TextField from '../elements/formfields/TextField';
import SingleSelectDropdown from '../elements/formfields/SingleSelectDropdown';
import MultiSelectDropdown from '../elements/formfields/MultiSelectDropdown';
import SwotFields from '../elements/formfields/SwotFields';
import ContactFields from '../elements/formfields/ContactFields';
import { useForm } from 'react-hook-form';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddResearchPotential } from '../../states/features/research/potential/potentialThunks';
import ClusterSubClusterField from '../elements/formfields/ClusterSubClusterField';
import {
  asyncGetInstitutionsOptions,
  asyncGetInstitutionsOptionsById,
} from '../../states/features/institution/institutionThunks';
import {
  selectInstitutionsOptions,
  selectInstitutionsOptionsDetail,
} from '../../states/features/institution/institutionSelectors';
import Select from 'react-select';

export default function AddResearchPotentialModal({
  isOpen,
  onClose,
  partnershipResearchTypeId,
}) {
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      partnershipResearchTypeId: partnershipResearchTypeId || null,
      partnershipResearchNeedsIds: [],
      partnershipResearchProgramIds: [],
      institutionId: null,
      contactName: '',
      contactPhoneNumber: '',
      contactEmail: '',
      contactStatus: null,
      analysisStrength: '',
      analysisWeakness: '',
      analysisOpportunities: '',
      analysisChallenge: '',
      documentUrl: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(asyncAddResearchPotential(data));
    // onClose();
  };

  const [query, setQuery] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const institutionsOptions = useSelector(selectInstitutionsOptions);
  const institutionsOptionsDetail = useSelector(
    selectInstitutionsOptionsDetail
  );

  useEffect(() => {
    if (institutionsOptionsDetail) {
      setValue(
        'instituteProfile',
        institutionsOptionsDetail.institutionProfile || ''
      );
      setValue(
        'institutionLocations',
        institutionsOptionsDetail.institutionLocations || []
      );
      setValue(
        'institutionClusterFocus',
        institutionsOptionsDetail.institutionClusterFocus || ''
      );
      setValue(
        'institutionClusterType',
        institutionsOptionsDetail.institutionClusterType || ''
      );
      // Jangan setValue untuk institutionId di sini!
    }
  }, [institutionsOptionsDetail, setValue]);

  const selectOptions = institutionsOptions.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  useEffect(() => {
    dispatch(
      asyncGetInstitutionsOptions({ query, typeId: partnershipResearchTypeId })
    );
  }, [dispatch, query]);

  if (!isOpen) return null;

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
              Form Tambah Mitra
              {(partnershipResearchTypeId === 1 && ' Universitas') ||
                (partnershipResearchTypeId === 2 && ' Lembaga/Komunitas')}
            </h2>
            <button onClick={onClose} className="text-2xl">
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pt-2 pb-4 space-y-4 overflow-y-auto"
            style={{ height: 'calc(900px - 92px)' }}
            // ref={dropdownRef}
          >
            <label className="block mb-1 font-medium">Nama Instansi</label>
            <Select
              name="institutionId"
              options={selectOptions}
              placeholder="Cari & pilih nama instansi"
              onInputChange={setQuery} // agar search ke API
              onChange={(option) => {
                setSelectedInstitution(option); // simpan option di state
                setValue('institutionId', option ? option.value : null);
                if (option) {
                  dispatch(
                    asyncGetInstitutionsOptionsById({ id: option.value })
                  );
                }
              }}
              isClearable
              isSearchable
              value={selectedInstitution}
            />

            {Array.isArray(watch('institutionLocations')) &&
            watch('institutionLocations').length > 0 ? (
              watch('institutionLocations').map((loc, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2">
                  <TextField
                    name={`institutionLocations.${idx}.provincieName`}
                    label={`Provinsi ${idx + 1}`}
                    placeholder="Masukkan provinsi"
                    register={register}
                    disable
                  />
                  <TextField
                    name={`institutionLocations.${idx}.regencieName`}
                    label={`Kab/Kota ${idx + 1}`}
                    placeholder="Masukkan kabupaten/kota"
                    register={register}
                    disable
                  />
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic">
                Lokasi institusi belum tersedia.
              </div>
            )}

            {partnershipResearchTypeId === 2 && (
              <>
                {watch('institutionClusterFocus') ||
                watch('institutionClusterType') ? (
                  <div className="grid grid-cols-2 gap-2">
                    <TextField
                      name="institutionClusterFocus"
                      label="Cluster Focus"
                      placeholder="Masukkan cluster focus"
                      register={register}
                      disable
                    />
                    <TextField
                      name="institutionClusterType"
                      label="Cluster Type"
                      placeholder="Masukkan cluster type"
                      register={register}
                      disable
                    />
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic">
                    Cluster Focus dan Cluster Type belum tersedia.
                  </div>
                )}
                <TextField
                  name="peran"
                  label="Peran"
                  placeholder="Masukkan peran"
                  register={register}
                />
                <TextField
                  name="wilayah jangkauan"
                  label="Wilayah Jangkauan"
                  placeholder="Masukkan wilayah jangkauan"
                  register={register}
                />
              </>
            )}

            {/* <SingleSelectDropdown
              name="provinsi"
              label="Provinsi"
              options={allProvinces}
              register={register}
              setValue={setValue}
            /> */}
            <TextField
              name="instituteProfile"
              label="Profil"
              placeholder="Masukkan profil"
              register={register}
            />
            <ContactFields register={register} />
            <MultiSelectDropdown
              name="partnershipResearchProgramIds"
              label="Program LSD"
              options={[
                { id: 1, label: 'LEAD' },
                { id: 2, label: 'CLP' },
                { id: 3, label: 'HOL' },
              ]}
              register={register}
              setValue={setValue}
            />
            <SingleSelectDropdownBadge
              name="contactStatus"
              label="Status"
              options={[
                { id: 1, label: 'Sudah dikontak' },
                { id: 0, label: 'Belum dikontak' },
              ]}
              register={register}
              setValue={setValue}
            />
            <MultiSelectDropdown
              name="partnershipResearchNeedsIds"
              label="Kebutuhan"
              options={[
                { id: 1, label: 'Surat Undangan Audiensi' },
                { id: 2, label: 'Surat Permohonan Kerjasama' },
              ]}
              register={register}
              setValue={setValue}
            />
            <SwotFields label="Program Analisis" register={register} />
            <TextField
              name="documentUrl"
              label="Link Dokumen"
              placeholder="https://.."
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
