import { useEffect, useState } from "react";
import { X, AlertTriangle } from "lucide-react";

const AlertBox = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const showTimer = setTimeout(() => setVisible(true), 10);

    const autoCloseTimer = setTimeout(() => {
      setVisible(false); 
      setTimeout(onClose, 500); 
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoCloseTimer);
    };
  }, [onClose]);

  const handleClose = () => {
    setVisible(false); 
    setTimeout(onClose, 500); 
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`w-[429px] h-[50px] flex items-center justify-between border border-red-400 bg-red-50 text-red-700 px-4 py-2 rounded-lg shadow-md transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <p className="text-xs">
            Email dan kata sandi tidak cocok. Hubungi <strong>Super Admin.</strong>
          </p>
        </div>
        <button onClick={handleClose} className="text-red-500 hover:text-red-700">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
