import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShieldAlert } from 'lucide-react';

import uni from '../../assets/img/uniCard.png';
import media from '../../assets/img/mediaCard.png';
import ingo from '../../assets/img/ingoCard.png';

import { Card } from '../fragments/Card';
import { HeaderLandingPg } from '../fragments/HeaderLandingPg';
import { HeroLandingPg } from '../fragments/HeroLandingPg';
import { HexahelixDiagram } from '../fragments/HexahelixDiagram';
import { asyncGetInstitutionsStats } from '../../states/features/institution/institutionThunks';
import { selectInstitutionsStats } from '../../states/features/institution/institutionSelectors';

// Untuk tampilan angka di tiap kartu Divisi saja -- bukan sumber kebenaran
// untuk scoping akses (itu ditentukan server, lihat
// PermissionResolverMySQL#getAllowedInstitutionTypeIds di back-end-sms).
const DIVISION_TYPE_IDS = {
  'LSD-SMS': [1, 2, 8],
  'SCP-SMS': [4, 5, 6, 7],
  'SDI-SMS': [3],
};

const CardSkeleton = () => (
  <div className='w-full min-h-[11rem] rounded-md border border-[#E7EDF4] p-4 flex flex-col justify-between animate-pulse'>
    <div className='h-5 w-2/3 bg-gray-200 rounded' />
    <div className='flex items-end justify-between'>
      <div className='h-6 w-16 bg-gray-200 rounded' />
      <div className='h-9 w-20 bg-gray-200 rounded-lg' />
    </div>
  </div>
);

export const LandingPgLyt = ({ username, user, allowedRoles = [], isLoading }) => {
  const dispatch = useDispatch();
  const stats = useSelector(selectInstitutionsStats);

  useEffect(() => {
    dispatch(asyncGetInstitutionsStats());
  }, [dispatch]);

  const statsByType = useMemo(
    () =>
      stats.reduce((acc, row) => {
        acc[row.typeId] = row.total;
        return acc;
      }, {}),
    [stats],
  );

  const cardsData = [
    {
      name: 'Universitas, Lembaga (NGO) & Komunitas',
      image: uni,
      accessRole: 'LSD-SMS',
    },
    {
      name: 'Media Massa, Dunia Usaha & Pemerintahan',
      image: media,
      accessRole: 'SCP-SMS',
    },
    {
      name: 'Lembaga Internasional (INGO)',
      image: ingo,
      accessRole: 'SDI-SMS',
    },
  ];

  const hasAnyAccess = allowedRoles.length > 0;

  return (
    <>
      <HeaderLandingPg
        username={username}
        user={user}
        isLoading={isLoading}
      />

      <main className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-10'>
        {/* Sapaan dan pemilihan Divisi digabung jadi SATU panel: keduanya
            satu alur ("halo -> sekarang pilih Divisi"), jadi tidak perlu
            dipisah kartu + heading mengambang yang bikin jarak vertikal
            menumpuk dan sisi kanan sapaan jadi kosong. */}
        <section className='mt-4 rounded-xl border border-[#E7EDF4] bg-white overflow-hidden'>
          <HeroLandingPg
            username={username}
            isLoading={isLoading}
          />

          <div className='p-6 md:p-8'>
            <h2 className='text-xl sm:text-2xl font-semibold text-gray-900'>
              Pilih Divisi
            </h2>
            <p className='mt-1 text-sm text-gray-500'>
              Pilih data stakeholder yang ingin Anda kelola.
            </p>

            <div className='mt-4'>
              {isLoading ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              ) : !hasAnyAccess ? (
                <div className='flex flex-col items-center text-center gap-2 rounded-xl border border-[#E7EDF4] bg-[#F5F9FF] px-6 py-10'>
                  <ShieldAlert className='w-8 h-8 text-[#DC3545]' />
                  <p className='font-semibold text-gray-900'>
                    Anda belum memiliki akses ke modul SMS manapun
                  </p>
                  <p className='text-sm text-gray-500 max-w-md'>
                    Hubungi Management untuk mengatur akses Divisi Anda lewat
                    menu Atur Akses.
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {cardsData.map((card, index) => {
                    const hasAccess = allowedRoles.includes(card.accessRole);
                    const typeIds = DIVISION_TYPE_IDS[card.accessRole] || [];
                    const count = typeIds.length
                      ? typeIds.reduce(
                          (sum, id) => sum + (statsByType[id] ?? 0),
                          0,
                        )
                      : null;
                    return (
                      <Card
                        key={index}
                        name={card.name}
                        image={card.image}
                        hasAccess={hasAccess}
                        selectedAccess={card.accessRole}
                        count={hasAccess ? count : null}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className='mt-6'>
          <HexahelixDiagram />
        </div>
      </main>
    </>
  );
};
