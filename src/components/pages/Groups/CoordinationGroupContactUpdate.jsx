import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  ArrowLeft,
  Save,
  Loader2,
  User,
  Briefcase,
  Phone,
  Mail
} from 'lucide-react';
import Select from 'react-select';

import { asyncGetContactById, asyncUpdateContactById } from '../../../states/features/group/contact/contactThunks';
import { selectContactDetail, selectContactLoading } from '../../../states/features/group/contact/contactSelectors';
import { clearContactDetail } from '../../../states/features/group/contact/contactSlice';
import { Button } from '../../elements/Button';
import TextField from '../../elements/formfields/TextField';

export default function CoordinationGroupContactUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: groupId, contactId } = useParams();

  const contactDetail = useSelector(selectContactDetail);
  const loading = useSelector(selectContactLoading);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, control, reset, formState: { isValid } } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (groupId && contactId) {
      dispatch(asyncGetContactById({ groupId, contactId }));
    }
    return () => {
      dispatch(clearContactDetail());
    };
  }, [dispatch, groupId, contactId]);

  useEffect(() => {
    if (contactDetail) {
      reset({
        contactFullName: contactDetail.contactName || '',
        contactPosition: contactDetail.contactPosition || '',
        contactPhoneNumber: contactDetail.contactPhoneNumber || '',
        contactEmail: contactDetail.contactEmail || '',
        contactStatusJoined: contactDetail.contactStatusJoined ? { value: 1, label: 'Join Grup' } : { value: 0, label: 'Belum Join Grup' },
        contactStatusActive: contactDetail.contactStatusActive ? { value: 1, label: 'Aktif' } : { value: 0, label: 'Tidak Aktif' },
      });
    }
  }, [contactDetail, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      contactStatusJoined: data.contactStatusJoined?.value,
      contactStatusActive: data.contactStatusActive?.value,
    };

    dispatch(asyncUpdateContactById({ groupId, contactId, payload }))
      .unwrap()
      .then(() => {
        navigate(-1);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsSubmitting(false));
  };

  const statusOptions = [
    { value: 1, label: 'Join Grup' },
    { value: 0, label: 'Belum Join Grup' },
  ];

  const activeOptions = [
    { value: 1, label: 'Aktif' },
    { value: 0, label: 'Tidak Aktif' },
  ];

  if (loading && !contactDetail) {
    return (
      <div className="max-w-4xl mx-auto p-4 animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          className="text-[#0D4690] hover:text-blue-800 cursor-pointer flex items-center gap-1 mb-3 transition-colors pl-0"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} /> Kembali
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">
          Detail Kontak
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information Section */}
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                <User size={20} className="text-[#0D4690]" /> Informasi Personal
              </h2>
            </div>

            <TextField
              label="Nama Lengkap"
              name="contactFullName"
              register={register}
              isRequired
              placeholder="Masukkan nama lengkap"
              icon={<User size={16} className="text-gray-400" />}
            />

            <TextField
              label="Jabatan"
              name="contactPosition"
              register={register}
              isRequired
              placeholder="Masukkan jabatan"
              icon={<Briefcase size={16} className="text-gray-400" />}
            />

            <TextField
              label="Nomor Telepon"
              name="contactPhoneNumber"
              register={register}
              placeholder="08..."
              icon={<Phone size={16} className="text-gray-400" />}
            />

            <TextField
              label="Email"
              name="contactEmail"
              type="email"
              register={register}
              placeholder="example@mail.com"
              icon={<Mail size={16} className="text-gray-400" />}
            />

            {/* Status Section */}
            <div className="col-span-1 md:col-span-2 mt-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                <div className="w-5 h-5 rounded-full border-2 border-[#0D4690] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#0D4690] rounded-full"></div>
                </div>
                Status
              </h2>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Status Join Grup
              </label>
              <Controller
                name="contactStatusJoined"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={statusOptions}
                    classNamePrefix="react-select"
                    placeholder="Pilih Status"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '42px',
                        borderColor: '#d1d5db',
                        '&:hover': { borderColor: '#9ca3af' },
                      }),
                    }}
                  />
                )}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Status Aktif
              </label>
              <Controller
                name="contactStatusActive"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={activeOptions}
                    classNamePrefix="react-select"
                    placeholder="Pilih Status"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '42px',
                        borderColor: '#d1d5db',
                        '&:hover': { borderColor: '#9ca3af' },
                      }),
                    }}
                  />
                )}
              />
            </div>

          </div>

          <div className="mt-8 pt-4 border-t flex justify-end gap-3">
            <Button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="px-4 py-2 text-sm font-medium text-white bg-[#0D4690] rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[140px] justify-center shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Simpan Perubahan
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
