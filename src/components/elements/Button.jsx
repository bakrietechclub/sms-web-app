export const Button = ({ type = "button", children, onClick, className }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};
