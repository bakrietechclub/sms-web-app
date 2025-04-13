import cubeHero from "../../assets/img/cube-cube.png";
import girlHero from "../../assets/img/girl-base.png";
const HeroDashboard = (props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative bg-linear-to-r from-[#0D4690] to-white w-[80dvw] h-75 rounded-lg bg-cover bg-center text-white p-7 overflow-hidden">
        <h2 className="font-semibold text-4xl mb-2.5">
          Halo, {props.username}
        </h2>
        <h6 className="font-semibold text-lg">
          Selamat Datang di Dashboard Utama Stakeholder
        </h6>
        <h6 className="font-semibold text-lg">Management System</h6>
        <p className="mt-5">Solusi inovatif untuk mengelola data anda</p>
        <img src={cubeHero} alt="" className="absolute -bottom-4 left-0" />
        <img src={girlHero} alt="" className="absolute bottom-0 right-0" />
      </div>
    </div>
  );
};
export default HeroDashboard;
