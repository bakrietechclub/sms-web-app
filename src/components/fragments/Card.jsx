// New folder/Card.jsx
import { useNavigate } from 'react-router-dom';
import { Button } from '../elements/Button';
import { useDispatch } from 'react-redux';
// import { setActiveStakeholder } from '../../states/features/stakeholder/activeStakeholderSlice';
import { RadioTower, Lock, ArrowRight } from 'lucide-react';

import trophy from '../../assets/icons/trophy.png';
import { setSelectedAccess } from '../../states/features/auth/authSlice';

const numberFormatter = new Intl.NumberFormat('id-ID');

// `count`: jumlah institusi Divisi ini (opsional -- lihat
// asyncGetInstitutionsStats). Ditampilkan hanya kalau tersedia, tidak pernah
// dipalsukan.
export const Card = ({ name, image, hasAccess, selectedAccess, count }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    // Tanpa akses SUNGGUHAN (role SMS_* dari SA), jangan biarkan masuk sama
    // sekali -- sebelumnya semua kartu bisa diklik & masuk dashboard
    // terlepas dari akses nyata, cuma beda label tombol.
    if (!hasAccess) return;
    dispatch(setSelectedAccess(selectedAccess));
    localStorage.setItem('selectedAccess', selectedAccess);
    navigate('/dashboard/research/potential-partner');
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={!hasAccess}
      aria-disabled={!hasAccess}
      title={
        !hasAccess
          ? 'Anda tidak memiliki akses ke Divisi ini -- hubungi admin untuk mengaturnya lewat Atur Akses'
          : undefined
      }
      className={`relative w-full min-h-[11rem] rounded-md shadow-sm p-4 flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-gray-50 ${
        hasAccess
          ? 'cursor-pointer hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D4690] focus-visible:ring-offset-2'
          : 'cursor-not-allowed'
      }`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom -1rem left -1rem',
      }}
    >
      <div
        className={`absolute inset-0 ${hasAccess ? 'bg-white/0' : 'bg-white/60'}`}
      />
      <h3 className='relative font-semibold text-lg text-gray-900'>{name}</h3>

      {!hasAccess ? (
        <span className='relative inline-flex items-center gap-1.5 self-start bg-white/90 text-[#DC3545] text-xs font-semibold px-2.5 py-1 rounded-full'>
          <Lock className='w-3 h-3' />
          Tidak ada akses
        </span>
      ) : (
        <div className='relative flex items-end justify-between gap-2'>
          {count != null && (
            <div className='leading-tight'>
              <p className='text-2xl font-bold text-[#0D4690]'>
                {numberFormatter.format(count)}
              </p>
              <p className='text-xs text-gray-500'>institusi terdaftar</p>
            </div>
          )}
          <span className='ml-auto inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium bg-[#E89229] text-white'>
            Kelola
            <ArrowRight className='w-4 h-4' />
          </span>
        </div>
      )}
    </button>
  );
};

export const CardItem = ({ item, onViewDetails }) => (
  <div className='flex-shrink-0 bg-white rounded-lg p-6 shadow flex flex-col items-start w-86 min-h-[260px] mr-6'>
    <div className='flex items-start mb-4 relative w-full'>
      <h5 className='text-xl font-semibold text-blue-900 w-64'>{item.title}</h5>
      <img
        src={item.icon}
        alt='icon'
        className='ml-3 w-9 h-9 mt-1'
      />
    </div>
    <div className='w-full bg-white rounded-lg border-1 border-gray-200 p-4 flex flex-col justify-between min-h-[110px] mt-auto'>
      <div className='flex items-center mb-2'>
        <img
          src={trophy}
          alt='trophy'
          className='w-6 h-6 mr-2'
        />
        <div>
          <p className='text-xs text-black font-normal'>Pemenang:</p>
          <p className='text-sm font-semibold text-black'>{item.winner}</p>
        </div>
      </div>
      <Button
        onClick={() => onViewDetails(item)}
        className='text-blue-900 text-xs underline self-end cursor-pointer'
      >
        Lihat Detail
      </Button>
    </div>
  </div>
);

export const MediaCard = ({ items }) => {
  if (!items || !Array.isArray(items)) {
    return null;
  }

  const totalPemberitaan = items.reduce(
    (sum, item) => sum + (item.counts || 0),
    0,
  );

  return (
    //First card is summary card
    <div className='flex gap-3 w-auto'>
      <div className='rounded-md shadow p-3 flex-1'>
        <h1 className='font-semibold text-[#0D4690]'>Jumlah Pemberitaan</h1>
        <p>Keseluruhan</p>
        <div className='flex justify-between rounded-md shadow p-2'>
          <RadioTower color='#DC3545' />
          <p>{totalPemberitaan} Pemberitaan</p>
        </div>
      </div>
      {/* The rest is based on array counts (Year) */}
      {items.map((item, index) => (
        <div
          key={index}
          className='rounded-md shadow p-3 flex-1'
        >
          <h1 className='font-semibold text-[#0D4690]'>Jumlah Pemberitaan</h1>
          <p>Tahun {item.year}</p>
          <div className='flex justify-between rounded-md shadow p-2'>
            <RadioTower color='#DC3545' />
            <p>{item.counts} Pemberitaan</p>
          </div>
        </div>
      ))}
    </div>
  );
};
