import { useSelector } from 'react-redux';
import { LandingPgLyt } from '../layouts/LandingPgLyt';

const LandingPage = () => {
  const { user } = useSelector((state) => state.authUser);

  return <LandingPgLyt username={user?.fullName} role={user?.accessRole} />;
};

export default LandingPage;
