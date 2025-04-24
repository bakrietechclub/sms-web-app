import { SecondaryButton } from "../elements/SecondaryButton";

export const Card = ({ name, image, manageAccess }) => {
  const isOutlined = !manageAccess;
  const buttonLabel = manageAccess ? "Kelola" : "Lihat";

  return (
    <div
      className="relative w-90 rounded-md shadow-sm p-4 flex flex-col h-50 overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom -1rem left -1rem",
      }}
    >
      <h2 className="font-semibold text-xl">{name}</h2>
      <SecondaryButton outlined={isOutlined} label={buttonLabel} />
    </div>
  );
};
