import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchX, Home } from 'lucide-react';
import { Button } from '../elements/Button'; // Assuming Button component exists

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-50 p-6 rounded-full">
            <SearchX size={64} className="text-[#0D4690]" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Halaman Tidak Ditemukan
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          Maaf, halaman yang Anda cari tidak tersedia, telah dipindahkan, atau link yang Anda tuju salah.
        </p>

        <div className="flex justify-center">
          <Button 
            className="flex items-center gap-2 bg-[#0D4690] text-white hover:bg-blue-800 px-6 py-3 rounded-lg transition-colors font-medium shadow-sm hover:shadow-md cursor-pointer"
            onClick={() => navigate('/home')}
          >
            <Home size={18} />
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
