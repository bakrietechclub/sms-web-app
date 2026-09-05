import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Info, Users, UserCheck, UserPlus } from 'lucide-react';
import { asyncGetResearchPotentialRecommendationDetail } from '../../../states/features/research/potential/potentialThunks';
import {
  selectRecommendationDetail,
  selectPotentialLoading,
} from '../../../states/features/research/potential/potentialSelectors';

const numberFormatter = new Intl.NumberFormat('id-ID');

const SummaryCard = ({ icon, label, value }) => {
  const IconComponent = icon;
  return (
  <div className='rounded-xl border border-[#E7EDF4] bg-white p-4 flex items-center gap-3'>
    <div className='w-10 h-10 rounded-lg bg-[#F5F9FF] flex items-center justify-center shrink-0'>
      <IconComponent className='w-5 h-5 text-[#0D4690]' />
    </div>
    <div>
      <p className='text-xs text-gray-500'>{label}</p>
      <p className='text-xl font-bold text-gray-900'>
        {numberFormatter.format(value || 0)}
      </p>
    </div>
  </div>
  );
};

export const PotentialPartnerRecommendationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(selectRecommendationDetail);
  const loading = useSelector(selectPotentialLoading);

  useEffect(() => {
    dispatch(asyncGetResearchPotentialRecommendationDetail({ id }));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className='max-w-5xl mx-auto pb-10 animate-pulse'>
        <div className='h-6 w-24 bg-gray-200 rounded mb-4' />
        <div className='h-8 w-64 bg-gray-200 rounded mb-6' />
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
          <div className='h-20 bg-gray-200 rounded-xl' />
          <div className='h-20 bg-gray-200 rounded-xl' />
          <div className='h-20 bg-gray-200 rounded-xl' />
        </div>
        <div className='h-48 bg-gray-200 rounded-xl' />
      </div>
    );
  }

  if (!data) {
    return (
      <div className='max-w-5xl mx-auto pb-10'>
        <button
          type='button'
          onClick={() => navigate('/research/potential-recommendations')}
          className='inline-flex items-center gap-1.5 text-sm font-medium text-[#0D4690] hover:text-[#08326b] cursor-pointer mb-4'
        >
          <ChevronLeft size={16} />
          Kembali
        </button>
        <p className='text-sm text-gray-500'>
          Data rekomendasi tidak ditemukan.
        </p>
      </div>
    );
  }

  const totals = (data.programs || []).reduce(
    (acc, p) => ({
      totalStudents: acc.totalStudents + (p.totalStudents || 0),
      totalStudentsRegistered:
        acc.totalStudentsRegistered + (p.totalStudentsRegistered || 0),
      totalStudentsActive: acc.totalStudentsActive + (p.totalStudentsActive || 0),
    }),
    { totalStudents: 0, totalStudentsRegistered: 0, totalStudentsActive: 0 },
  );

  return (
    <div className='max-w-5xl mx-auto pb-10 space-y-6'>
      <div>
        <button
          type='button'
          onClick={() => navigate('/research/potential-recommendations')}
          className='inline-flex items-center gap-1.5 text-sm font-medium text-[#0D4690] hover:text-[#08326b] cursor-pointer mb-3'
        >
          <ChevronLeft size={16} />
          Kembali ke Daftar Riset Potensial Mitra
        </button>
        <h1 className='text-2xl font-bold text-gray-800'>{data.instituteName}</h1>
        <p className='text-sm text-gray-500 mt-1'>
          {data.typeName} &middot; {data.regionName || 'Region tidak diketahui'}
        </p>
      </div>

      <div className='flex items-start gap-2.5 rounded-lg bg-[#F5F9FF] border border-[#E7EDF4] px-4 py-3 text-sm text-gray-600'>
        <Info size={16} className='text-[#0D4690] mt-0.5 shrink-0' />
        <span>
          Institusi ini belum memiliki kerja sama formal dengan BCF (belum
          ada MoU/PKS), tapi sudah punya mahasiswa yang mengikuti program
          magang seperti Campus Leaders Program. Rincian di bawah adalah
          bukti dari mana angka Total Mahasiswa/Pendaftar/Aktif berasal,
          dipecah per Program.
        </span>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <SummaryCard
          icon={Users}
          label='Total Mahasiswa'
          value={totals.totalStudents}
        />
        <SummaryCard
          icon={UserPlus}
          label='Total Pendaftar'
          value={totals.totalStudentsRegistered}
        />
        <SummaryCard
          icon={UserCheck}
          label='Total Aktif'
          value={totals.totalStudentsActive}
        />
      </div>

      <div className='rounded-xl border border-[#E7EDF4] bg-white overflow-hidden'>
        <div className='px-5 py-4 border-b border-[#E7EDF4]'>
          <h2 className='font-semibold text-gray-900'>Rincian per Program</h2>
          <p className='text-xs text-gray-500 mt-0.5'>
            Cukup nama program dan jumlahnya -- tanpa data mahasiswa
            individual.
          </p>
        </div>
        {data.programs?.length ? (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-[#F5F9FF] text-[#0D4690]'>
                <tr>
                  <th className='text-left font-semibold px-5 py-3'>Program</th>
                  <th className='text-right font-semibold px-5 py-3'>
                    Total Mahasiswa
                  </th>
                  <th className='text-right font-semibold px-5 py-3'>
                    Total Pendaftar
                  </th>
                  <th className='text-right font-semibold px-5 py-3'>
                    Total Aktif
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.programs.map((program, index) => (
                  <tr
                    key={index}
                    className='border-t border-[#E7EDF4]'
                  >
                    <td className='px-5 py-3 font-medium text-gray-900'>
                      {program.programName}
                    </td>
                    <td className='px-5 py-3 text-right text-gray-700'>
                      {numberFormatter.format(program.totalStudents)}
                    </td>
                    <td className='px-5 py-3 text-right text-gray-700'>
                      {numberFormatter.format(program.totalStudentsRegistered)}
                    </td>
                    <td className='px-5 py-3 text-right text-gray-700'>
                      {numberFormatter.format(program.totalStudentsActive)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='px-5 py-8 text-sm text-gray-400 text-center'>
            Belum ada mahasiswa terdata dari institusi ini.
          </p>
        )}
      </div>
    </div>
  );
};

export default PotentialPartnerRecommendationDetail;
