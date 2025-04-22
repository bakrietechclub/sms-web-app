const Label = ({ label, status }) => {
  if (!label) return null;

  const styles = {
    success: "bg-[#DFF2E3] text-[#28a745]",
    warning: "bg-[#FFF6da] text-[#ffc107]",
    danger: "bg-[#Fae1e3] text-[#dc3545]",
    info: "bg-[#dbf7fd] text-[#0Dcaf0]",
    default: "bg-[#dbe3ee] text-[#0D4690]",
  };

  const styleClass = styles[status] || styles.default;

  return (
    <label className={`text-sm w-auto rounded py-1 px-2 ${styleClass}`}>
      {label}
    </label>
  );
};

export default Label;
