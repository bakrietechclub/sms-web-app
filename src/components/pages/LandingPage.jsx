import { useSelector } from "react-redux"; 
import LandingPgLyt from "../layouts/LandingPgLyt";

const LandingPage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <LandingPgLyt 
      username={user?.username ?? "Guest"} 
      role={user?.role ?? "Unknown"} 
    />
  );
};

export default LandingPage;
