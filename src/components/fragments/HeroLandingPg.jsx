import cubeHero from "../../assets/img/cube-cube.png";
import girlHero from "../../assets/img/girl-base.png";

export const HeroLandingPg = ({ username, isLoading }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative bg-gradient-to-r from-[#0D4690] to-blue-50 w-full max-w-[80%] mx auto h-[300px] rounded-lg bg-cover bg-center text-white p-7 overflow-hidden">
        {isLoading ? (
          <div className="h-9 w-64 bg-white/20 rounded animate-pulse mb-2.5" />
        ) : (
          <h2 className="font-semibold text-3xl mb-2.5">Halo, {username}</h2>
        )}
        <h6 className="font-semibold text-base">
          Selamat Datang di Dashboard Utama Stakeholder
        </h6>
        <h6 className="font-semibold text-base">Management System</h6>
        <p className="mt-5 text-base">Solusi inovatif untuk mengelola data anda</p>

        {/* Decorative Images */}
        <img
          src={cubeHero}
          alt="Cube Decoration"
          className="absolute -bottom-4 left-0"
        />
        <img
          src={girlHero}
          alt="Girl Decoration"
          className="absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
};
