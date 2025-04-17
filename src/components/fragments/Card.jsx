import SecondaryButton from "../elements/SecondaryButton";

const Card = (props) => {
  const outlined = !props.manageAccess;
  // outlined kalau aksesnya false/tidak ada
  const label = props.manageAccess ? "Kelola" : "Lihat";
  return (
    <div
      className="relative bg-position-[bottom_-1rem_left_-1rem] w-90 outline-neutral-700 rounded-md shadow-sm p-4 flex flex-col h-50 overflow-hidden"
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="font-semibold text-xl">{props.name}</h2>
      <SecondaryButton outlined={outlined} label={label} />
    </div>
  );
};
export default Card;
