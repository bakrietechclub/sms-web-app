const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`w-full py-2 bg-blue-900 text-white rounded-lg
      hover:bg-blue-950 hover:scale-[1.02] hover:shadow-lg
      active:scale-95 transition-all duration-200 ease-in-out ${className}`}
  >
    {children}
  </button>
);

export default Button;
