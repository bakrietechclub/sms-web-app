import { useSelector } from 'react-redux';
import { LandingPgLyt } from '../layouts/LandingPgLyt';
import { selectAuthLoading, selectAuthUser } from '../../states/features/auth/authSelectors';

const LandingPage = () => {
  const user = useSelector(selectAuthUser);
  const userLoading = useSelector(selectAuthLoading);
  const isPreload = useSelector((state) => state.isPreload);
  const isLoading = userLoading || isPreload;

  return <LandingPgLyt username={user?.fullName} role={user?.accessRole} isLoading={isLoading} />;
};

export default LandingPage;
