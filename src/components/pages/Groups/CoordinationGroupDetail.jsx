import React, { useEffect, useState } from 'react';
import { Button } from '../../elements/Button';
import { ChevronLeft, Building2, Link as LinkIcon, Users, Phone, Mail, Edit } from 'lucide-react';
import { Label } from '../../elements/Label';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroupDetail } from '../../../states/features/group/groupSelectors';
import { asyncGetGroupById } from '../../../states/features/group/groupThunks';
import AddCoorGroupContactModal from '../../fragments/AddCoorGroupContactModal';
import { selectContacts } from '../../../states/features/group/contact/contactSelectors';
import { asyncGetContactByGroupId } from '../../../states/features/group/contact/contactThunks';

export default function CoordinationGroupDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const data = useSelector(selectGroupDetail);
  const contacts = useSelector(selectContacts);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(asyncGetGroupById({ id }));
    dispatch(asyncGetContactByGroupId({ groupId: id }));
  }, [dispatch, id]);

  const updateButtonClasses = `
    rounded-md px-4 py-2 text-sm font-medium transition duration-200 shadow-sm
    bg-[#0D4690] text-white hover:bg-blue-800 cursor-pointer
  `;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Back Button and Actions */}
      <div className="mb-4">
        <Button
          className="text-[#0D4690] hover:text-blue-800 cursor-pointer flex items-center gap-1 mb-3 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} /> Kembali
        </Button>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Grup Koordinasi
          </h1>
          <Button className={updateButtonClasses}>
            Perbarui
          </Button>
        </div>
      </div>

      {/* Main Information Card */}
      <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Building2 size={14} /> Nama Instansi
            </p>
            <p className="text-sm font-semibold text-gray-900">{data?.instituteName || '-'}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Jenis Instansi</p>
            <p className="text-sm text-gray-900">{data?.parnershipResearchType || '-'}</p>
          </div>
        </div>
      </div>

      {/* Group Link Card */}
      {data?.groupUrl && (
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <LinkIcon size={16} /> Link Grup
          </h2>
          <a
            href={data.groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0D4690] hover:text-blue-800 text-sm underline break-all"
          >
            {data.groupUrl}
          </a>
        </div>
      )}

      {/* Contacts Section */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Users size={18} /> Kontak
          </h2>
          <Button
            onClick={() => setOpenModal(true)}
            className={updateButtonClasses}
          >
            Tambah Kontak
          </Button>
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#E7EDF4] text-[#0D4690]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">No.</th>
                <th className="px-4 py-3 text-left font-semibold">Nama</th>
                <th className="px-4 py-3 text-left font-semibold">Jabatan</th>
                <th className="px-4 py-3 text-left font-semibold">No. HP</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-center font-semibold">Status</th>
                <th className="px-4 py-3 text-center font-semibold">Status Aktif</th>
                <th className="px-4 py-3 text-center font-semibold rounded-tr-lg">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts && contacts.length > 0 ? (
                contacts.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{item?.contactName || '-'}</td>
                    <td className="px-4 py-3 text-gray-700">{item?.contactPosition || '-'}</td>
                    <td className="px-4 py-3">
                      {item?.contactPhoneNumber ? (
                        <a
                          href={`https://wa.me/${item.contactPhoneNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0D4690] hover:text-blue-800 inline-flex items-center gap-1"
                        >
                          <Phone size={12} /> {item.contactPhoneNumber}
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {item?.contactEmail ? (
                        <a
                          href={`mailto:${item.contactEmail}`}
                          className="text-[#0D4690] hover:text-blue-800 inline-flex items-center gap-1"
                        >
                          <Mail size={12} /> {item.contactEmail}
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Label
                        label={item?.contactStatusJoined ? 'Join Grup' : 'Belum Join Grup'}
                        status={item?.contactStatusJoined ? 'success' : 'danger'}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Label
                        label={item?.contactStatusActive ? 'Aktif' : 'Tidak Aktif'}
                        status={item?.contactStatusActive ? 'success' : 'danger'}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="text-[#0D4690] hover:text-blue-800 font-medium inline-flex items-center gap-1 transition-colors">
                        <Edit size={14} /> Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                    Belum ada kontak yang ditambahkan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddCoorGroupContactModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
