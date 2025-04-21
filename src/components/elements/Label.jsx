const Label = (props) => {
  if (!props.label) return null;
  switch (props.status) {
    case "success":
      return (
        <label className="bg-[#DFF2E3] text-[#28a745] text-sm w-auto rounded py-1 px-2">
          {props.label}
        </label>
      );
    case "warning":
      return (
        <label className="bg-[#FFF6da] text-[#ffc107] text-sm w-auto rounded py-1 px-2">
          {props.label}
        </label>
      );
    case "danger":
      return (
        <label className="bg-[#Fae1e3] text-[#dc3545] text-sm w-auto rounded py-1 px-2">
          {props.label}
        </label>
      );
    case "info":
      return (
        <label className="bg-[#dbf7fd] text-[#0Dcaf0] text-sm w-auto rounded py-1 px-2">
          {props.label}
        </label>
      );
    default:
      return (
        <label className="bg-[#dbe3ee] text-[#0D4690] text-sm w-auto rounded py-1 px-2">
          {props.label}
        </label>
      );
  }
};
export default Label;
