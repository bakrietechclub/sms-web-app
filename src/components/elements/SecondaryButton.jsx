export const SecondaryButton = ({ outlined, label }) => {
  const baseClass =
    "absolute bottom-5 right-5 rounded-lg px-4 py-2 mt-4 transition duration-300 ease-in-out cursor-pointer";

  return (
    <button
      className={`${baseClass} ${
        outlined
          ? "bg-white text-[#E89229] outline-1 outline-[#E89229] hover:bg-[#E89229] hover:text-white"
          : "bg-[#E89229] text-white hover:bg-[#D18325]"
      }`}
    >
      {label}
    </button>
  );
};
