import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../elements/Button';
import { ChevronLeft, MapPin, Phone, Mail, FileText, ExternalLink } from 'lucide-react';
import { Label } from '../../elements/Label';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetResearchPotentialById } from '../../../states/features/research/potential/potentialThunks';
import { selectPotentialDetail } from '../../../states/features/research/potential/potentialSelectors';
import UpdateResearchPotentialModal from '../../fragments/UpdateResearchPotentialModal';
import {
  selectedAccessTypeInstitutionsId,
  selectHasAccess,
} from '../../../states/features/auth/authSelectors';

export default function PotentialPartnerDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const accessTypeId = useSelector(selectedAccessTypeInstitutionsId);
  const hasAccess = useSelector(selectHasAccess);
  const data = useSelector(selectPotentialDetail);

  useEffect(() => {
    dispatch(asyncGetResearchPotentialById({ id }));
  }, [dispatch, id]);

  const disabledClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-75';

  const updateButtonClasses = `
    rounded-md px-4 py-2 text-sm font-medium transition duration-200 shadow-sm
    ${!hasAccess ? disabledClasses : 'bg-[#0D4690] text-white hover:bg-blue-800 cursor-pointer'}
  `;

  const deleteButtonClasses = `
    rounded-md px-4 py-2 text-sm font-medium transition duration-200 shadow-sm
    ${!hasAccess ? disabledClasses : 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'}
  `;

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button and Actions */}
        <div className="mb-4">
          <Button
            className="text-[#0D4690] hover:text-blue-800 cursor-pointer flex items-center gap-1 mb-3 transition-colors"
            onClick={() => (navigate(-1))}
          >
            <ChevronLeft size={20} /> Kembali
          </Button>

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              {data?.instituteName.toLowerCase().includes('universitas')
                ? 'Universitas'
                : 'Lembaga Sosial/Komunitas'}
            </h1>
            <div className="flex gap-2">
              <Button
                disabled={!hasAccess}
                className={updateButtonClasses}
                onClick={() => setOpenModal(true)}
              >
                Perbarui
              </Button>
              <Button
                disabled={!hasAccess}
                className={deleteButtonClasses}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>

        {/* Main Information Card */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Nama Lembaga/Komunitas</p>
              <p className="text-sm font-semibold text-gray-900">{data?.instituteName || '-'}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Program LSD</p>
              <p className="text-sm text-gray-900">{data?.partnershipResearchProgram?.join(', ') || '-'}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                <MapPin size={14} /> Region
              </p>
              <div className="text-sm text-gray-900">
                {data?.partnershipResearchProvincies?.length > 0 ? (
                  data.partnershipResearchProvincies.map((value, key) => (
                    <p key={key} className="mb-1">
                      {value.provincieName} - {value.regencieName}
                    </p>
                  ))
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Status Audiensi</p>
              <Label
                label={data?.contactStatus}
                status={data?.contactStatus === 'Sudah dikontak' ? 'success' : 'danger'}
              />
            </div>

            {data?.instituteName && !data?.instituteName.toLowerCase().includes('universitas') && (
              <>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Cluster</p>
                  <p className="text-sm text-gray-900">-</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Sub-cluster</p>
                  <p className="text-sm text-gray-900">-</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Phone size={18} /> Informasi Kontak
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Nama</dt>
              <dd className="text-gray-900">{data?.contactName || '-'}</dd>
            </div>

            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Jabatan</dt>
              <dd className="text-gray-900">{data?.contactPosition || '-'}</dd>
            </div>

            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">No. Telepon</dt>
              <dd className="flex items-center gap-2">
                <span className="text-gray-900">{data?.contactPhoneNumber || '-'}</span>
                {data?.contactPhoneNumber && (
                  <a
                    href={`https://wa.me/${data?.contactPhoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium underline inline-flex items-center gap-1"
                  >
                    WhatsApp <ExternalLink size={12} />
                  </a>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</dt>
              <dd className="flex items-center gap-2">
                <span className="text-gray-900 break-all">{data?.contactEmail || '-'}</span>
                {data?.contactEmail && (
                  <a
                    href={`mailto:${data?.contactEmail}`}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium underline inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <Mail size={12} /> Email
                  </a>
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* Needs Section */}
        {data?.partnershipResearchNeeds && data.partnershipResearchNeeds.length > 0 && (
          <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Kebutuhan</h2>
            <p className="text-sm text-gray-900">{data.partnershipResearchNeeds.join(', ')}</p>
          </div>
        )}

        {/* SWOT Analysis Card */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Analisis SWOT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-2">Strengths (Kekuatan)</h3>
              <p className="text-sm text-gray-700">{data?.analysisStrenghts || '-'}</p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-red-800 mb-2">Weaknesses (Kelemahan)</h3>
              <p className="text-sm text-gray-700">{data?.analysisWeakness || '-'}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Opportunities (Peluang)</h3>
              <p className="text-sm text-gray-700">{data?.analysisOpportunities || '-'}</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-yellow-800 mb-2">Challenges (Tantangan)</h3>
              <p className="text-sm text-gray-700">{data?.analysisChallenge || '-'}</p>
            </div>
          </div>
        </div>

        {/* Document Link */}
        {data?.urlDocument && (
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FileText size={16} /> Link Dokumen
            </h2>
            <a
              href={`https://${data.urlDocument}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D4690] hover:text-blue-800 text-sm underline inline-flex items-center gap-1 break-all"
            >
              {data.urlDocument} <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>

      <UpdateResearchPotentialModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        accessTypeId={accessTypeId}
        researchPotentialId={id}
        initialData={data}
      />
    </>
  );
}
