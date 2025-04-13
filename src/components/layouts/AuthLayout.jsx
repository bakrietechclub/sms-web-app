import { useState, useEffect } from "react";
import logoBCF from "../../assets/img/logoBCF.png";
import loginIllustration from "../../assets/img/loginIllustration.png";

const AuthLayout = ({ children }) => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowPage(true), 300);
  }, []);

  return (
    <div
      className={`flex flex-col md:flex-row h-screen w-screen overflow-hidden transition-opacity duration-700 ${
        showPage ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Left Side  */}
      <div className="hidden md:flex flex-1 items-center justify-center pl-20">
        <img
          src={loginIllustration}
          alt="Login Illustration"
          className="hidden md:block w-[420px] h-auto object-contain"
        />
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center px-4 md:pr-28">
        <div className="w-full max-w-md h-full flex flex-col items-center justify-center space-y-4">
          {/* Logo */}
          <img src={logoBCF} alt="BCF Logo" className="h-14" />

          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold leading-snug">
              Selamat Datang <br />
              <span className="text-black">
                di Stakeholder Management System
              </span>
            </h2>
            <p className="text-black text-base mt-1">
              Masuk untuk mengelola data mitra anda
            </p>
          </div>

          {/* Illustration for mobile */}
          <div className="md:hidden flex justify-center">
            <img
              src={loginIllustration}
              alt="Login Illustration"
              className="w-48 h-auto object-contain"
            />
          </div>

          {/* Content */}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
