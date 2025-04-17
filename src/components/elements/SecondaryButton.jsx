const SecondaryButton = (props) => {
  if (props.outlined) {
    return (
      <button
        className="absolute bottom-5 right-5 
          bg-white text-[#E89229] outline-[#E89229] outline-1
          rounded-lg px-4 py-2 mt-4 
          transition duration-300 ease-in-out 
          hover:bg-[#E89229] hover:text-white cursor-pointer"
      >
        {props.label}
      </button>
    );
  }
  return (
    <button
      className="absolute bottom-5 right-5 
        bg-[#E89229] text-white 
        rounded-lg px-4 py-2 mt-4 
        transition duration-300 ease-in-out 
        hover:bg-[#D18325] cursor-pointer"
    >
      {props.label}
    </button>
  );
};
export default SecondaryButton;
