export const Button = ({ type = "button", children, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};
