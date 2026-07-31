// New folder/Card.jsx
import { useNavigate } from 'react-router-dom';
import { Button } from '../elements/Button';
import { useDispatch } from 'react-redux';
// import { setActiveStakeholder } from '../../states/features/stakeholder/activeStakeholderSlice';
import { RadioTower } from 'lucide-react';

import trophy from '../../assets/icons/trophy.png';
import { setSelectedAccess } from '../../states/features/auth/authSlice';

export const Card = ({ name, image, manageAccess, hasAccess = manageAccess, selectedAccess }) => {
  const isOutlined = manageAccess
    ? 'bg-[#E89229] text-white hover:bg-[#D18325]'
    : 'bg-white text-[#E89229] outline-1 outline-[#E89229] hover:bg-[#E89229] hover:text-white';

  const buttonLabel = !hasAccess ? 'Tidak ada akses' : manageAccess ? 'Kelola' : 'Lihat';
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
    <div
      className={`relative max-w-96 h-48 rounded-md shadow-sm p-4 flex flex-2/4 overflow-hidden ${!hasAccess ? 'opacity-50 grayscale' : ''}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom -1rem left -1rem',
      }}
    >
      <h2 className='font-semibold text-xl'>{name}</h2>
      {!hasAccess && (
        <span className='absolute top-3 right-3 bg-white/90 text-[#DC3545] text-xs font-semibold px-2 py-1 rounded-full'>
          Tidak ada akses
        </span>
      )}
      <Button
        onClick={handleClick}
        disabled={!hasAccess}
        title={!hasAccess ? 'Anda tidak memiliki akses ke Divisi ini -- hubungi admin untuk mengaturnya lewat Atur Akses' : undefined}
        className={
          (hasAccess ? isOutlined : 'bg-gray-300 text-gray-500 cursor-not-allowed') +
          ` absolute bottom-5 right-5 rounded-lg px-4 py-2 mt-4 transition duration-300 ease-in-out ${hasAccess ? 'cursor-pointer' : ''}`
        }
      >
        {buttonLabel}
      </Button>
    </div>
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
