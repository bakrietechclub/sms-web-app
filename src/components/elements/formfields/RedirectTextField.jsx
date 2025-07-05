import { useRef } from "react";
import redirect from "../../../assets/icons/redirect.png";

const RedirectTextField = ({
  label,
  value = "",
  onRedirect,
  className = "",
  role = "", 
  isRequired
}) => {
  const containerRef = useRef();

  const handleClick = () => {
    if (onRedirect && typeof onRedirect === "function") {
      onRedirect(role);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <label className="block mb-1 font-medium">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div
        className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100 text-gray-500 italic cursor-pointer flex items-center justify-between"
        onClick={handleClick}
      >
        <span className={`${value ? "not-italic text-black" : ""}`}>
          {value || "Kamu belum membuat penomoran surat"}
        </span>
        <img
          src={redirect}
          alt="redirect"
          className="w-4 h-4 ml-2 opacity-70"
        />
      </div>
    </div>
  );
};

export default RedirectTextField;
