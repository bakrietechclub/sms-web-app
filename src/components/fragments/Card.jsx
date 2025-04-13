import SecondaryButton from "../elements/SecondaryButton";

const Role = (props) => {
  return (
    <div
      className="relative bg-position-[bottom_-1rem_left_-1rem] w-90 outline-neutral-700 rounded-md shadow-sm p-4 flex flex-col h-50 overflow-hidden"
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="font-semibold text-xl">{props.roleName}</h2>
      <SecondaryButton label="Kelola" />
    </div>
  );
};
export default Role;
