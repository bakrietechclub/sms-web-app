import React, { useEffect, useState } from 'react';
import TextField from '../elements/formfields/TextField';
import MultiSelectDropdown from '../elements/formfields/MultiSelectDropdown';
import SwotFields from '../elements/formfields/SwotFields';
import ContactFields from '../elements/formfields/ContactFields';
import { useForm } from 'react-hook-form';
import SingleSelectDropdownBadge from '../elements/formfields/SingleSelectDropdownBadge';
import { useDispatch, useSelector } from 'react-redux';
import {
  // Ganti ke thunk update Anda
  asyncUpdateResearchPotentialById,
  asyncGetResearchPotentialById,
} from '../../states/features/research/potential/potentialThunks';
import {
  asyncGetInstitutionsOptions,
  asyncGetInstitutionsOptionsById,
} from '../../states/features/institution/institutionThunks';
import {
  selectInstitutionsOptions,
  selectInstitutionsOptionsDetail,
} from '../../states/features/institution/institutionSelectors';
import Select from 'react-select';

// Tambahkan prop researchPotentialId dan initialData
export default function UpdateResearchPotentialModal({
  isOpen,
  onClose,
  accessTypeId,
  researchPotentialId, // ID data yang akan diupdate
  initialData, // Data awal yang sudah difetch (opsional, jika data detail sudah tersedia)
}) {
  console.log(initialData);
  const dispatch = useDispatch();
  // Pastikan Anda memuat data dari prop initialData ke defaultValues atau useEffect
  const { register, handleSubmit, setValue, watch } = useForm({
    // Default values akan ditimpa oleh data dari initialData di useEffect
    defaultValues: {
      partnershipResearchNeedsIds: [],
      partnershipResearchProgramIds: [],
      institutionId: null,
      contactName: '',
      contactPhoneNumber: '',
      contactPosition: '', // Tambahkan contactPosition dari tabel tx_partnership_research
      contactEmail: '',
      contactStatus: null,
      strengths: '',
      weakness: '',
      opportunities: '',
      challenges: '',
      documentUrl: '',
      instituteProfile: '',
      // Kolom lain dari tx_partnership_research
      id_regencies: null,
      // ...
    },
  });

  const [query, setQuery] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const institutionsOptions = useSelector(selectInstitutionsOptions);
  const institutionsOptionsDetail = useSelector(
    selectInstitutionsOptionsDetail
  );

  // State untuk menyimpan data yang sudah di-fetch
  const [formData, setFormData] = useState(initialData || null);

  // LOGIKA SUBMIT UNTUK UPDATE
  const onSubmit = (data) => {
    console.log('Update data:', data);
    dispatch(
      // Panggil thunk update dan sertakan ID
      asyncUpdateResearchPotentialById({ id: researchPotentialId, data })
    )
      .unwrap()
      .then(() => onClose())
      .catch((err) => console.error(err));
  };

  // LOGIKA FETCH DATA DETAIL
  useEffect(() => {
    // Jika modal dibuka dan belum ada data, fetch data detail
    if (isOpen && researchPotentialId && !initialData) {
      dispatch(asyncGetResearchPotentialById({ id: researchPotentialId }))
        .unwrap()
        .then((data) => setFormData(data))
        .catch((err) => console.error('Failed to fetch detail:', err));
    } else if (isOpen && initialData) {
      setFormData(initialData);
    }
  }, [isOpen, researchPotentialId, initialData, dispatch]);

  // LOGIKA PENGISIAN FORM (DARI initialData/formData)
  useEffect(() => {
    if (formData) {
      // SET VALUE UNTUK SEMUA FIELD BERDASARKAN initialData/formData

      // Data Institusi
      const institutionOption = {
        value: formData.id_institute,
        label: formData.institute_name,
      };
      setSelectedInstitution(institutionOption);
      setValue('institutionId', formData.id_institute);
      setValue('instituteProfile', formData.institute_profile || '');

      // LOGIKA DIMULAI DARI KONTAK DAN SWOT

      // Kontak
      setValue('contactName', formData.contact_name || '');
      setValue('contactPhoneNumber', formData.contact_phone_number || '');
      setValue('contactPosition', formData.contact_position || ''); // Pastikan ada di ContactFields
      setValue('contactEmail', formData.contact_email || '');
      // Pastikan data yang masuk ke status adalah number (1 atau 0)
      setValue(
        'contactStatus',
        formData.contact_status !== undefined
          ? {
              id: formData.contact_status,
              label:
                formData.contact_status === 1
                  ? 'Sudah dikontak'
                  : 'Belum dikontak',
            }
          : null
      );

      // Program Analisis (SWOT)
      setValue('analysisStrength', formData.analysis_strengths || '');
      setValue('analysisWeakness', formData.analysis_weakness || '');
      setValue('analysisOpportunities', formData.analysis_opportunities || '');
      setValue('analysisChallenge', formData.analysis_challenge || '');

      // Kebutuhan dan Program (Asumsi data sudah berupa array of objects {id, label} dari Redux/API)
      // Anda perlu menyesuaikan ini dengan struktur data yang dikirimkan API
      // Contoh:
      // setValue('partnershipResearchProgramIds', formData.partnership_research_programs || []);
      // setValue('partnershipResearchNeedsIds', formData.partnership_research_needs || []);

      setValue('documentUrl', formData.document_url || '');

      // Panggil detail institusi untuk memuat lokasi dan cluster
      if (formData.id_institute) {
        dispatch(
          asyncGetInstitutionsOptionsById({ id: formData.id_institute })
        );
      }
    }
  }, [formData, setValue, dispatch]);

  // Efek untuk memuat detail lokasi/cluster setelah fetch by ID
  useEffect(() => {
    if (institutionsOptionsDetail) {
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
    }
  }, [institutionsOptionsDetail, setValue]);

  // Efek untuk memuat opsi pencarian institusi
  useEffect(() => {
    dispatch(asyncGetInstitutionsOptions({ query, typeId: accessTypeId }));
  }, [dispatch, query, isOpen]);

  if (!isOpen || !researchPotentialId) return null; // Tambahkan cek ID

  const selectOptions = institutionsOptions.map((item) => ({
    value: item.id,
    label: item.label,
  }));

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
              Form Ubah Mitra
              {(accessTypeId === 1 && ' Universitas') ||
                (accessTypeId === 2 && ' Lembaga/Komunitas')}
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
            {/* -------------------- DATA INSTITUSI (Bagian Awal) -------------------- */}
            <label className="block mb-1 font-medium">Nama Instansi</label>
            <Select
              name="institutionId"
              options={selectOptions}
              placeholder="Cari & pilih nama instansi"
              onInputChange={setQuery}
              onChange={(option) => {
                setSelectedInstitution(option);
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

            {accessTypeId === 2 && (
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
                  // Perlu set value untuk kolom ini
                />
                <TextField
                  name="wilayah jangkauan"
                  label="Wilayah Jangkauan"
                  placeholder="Masukkan wilayah jangkauan"
                  register={register}
                  // Perlu set value untuk kolom ini
                />
              </>
            )}
            <TextField
              name="instituteProfile"
              label="Profil"
              placeholder="Masukkan profil"
              register={register}
              disable
            />

            {/* -------------------- KONTAK (Permintaan Anda) -------------------- */}
            <ContactFields register={register} />

            {/* -------------------- BIDANG LAINNYA -------------------- */}
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

            {/* -------------------- FOOTER -------------------- */}
            <div className="text-right pt-4">
              <button
                type="submit"
                className="bg-[#0d4690] text-white px-8 py-2 rounded-lg hover:bg-[#0c3f82] transition"
              >
                Perbarui
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
