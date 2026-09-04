import cubeHero from '../../assets/img/cube-cube.png';
import girlHero from '../../assets/img/girl-base.png';

export const HeroLandingPg = ({ username, isLoading }) => {
  return (
    // Tanpa rounded/border sendiri -- komponen ini dipasang sebagai strip
    // paling atas di dalam panel (LandingPgLyt), sudut membulatnya diurus
    // `overflow-hidden` milik panel itu.
    <div className='relative bg-gradient-to-r from-[#0D4690] to-blue-50 w-full bg-cover bg-center text-white py-6 px-6 sm:px-8 overflow-hidden'>
      {/* Dekorasi -- di belakang teks (z-0), disembunyikan di layar sempit
          supaya tidak menimpa teks */}
      <img
        src={cubeHero}
        alt=''
        aria-hidden='true'
        className='hidden md:block absolute -bottom-4 left-0 z-0 pointer-events-none'
      />
      <img
        src={girlHero}
        alt=''
        aria-hidden='true'
        className='hidden md:block absolute bottom-0 right-0 z-0 pointer-events-none'
      />

      <div className='relative z-10'>
        {isLoading ? (
          <div className='h-8 w-56 bg-white/20 rounded animate-pulse mb-1' />
        ) : (
          <h1 className='font-semibold text-2xl sm:text-3xl mb-1'>
            Halo, {username}
          </h1>
        )}
        <p className='font-medium text-sm sm:text-base'>
          Selamat Datang di Dashboard Utama Stakeholder Management System
        </p>
      </div>
    </div>
  );
};
