import { useSelector } from 'react-redux';
import { LandingPgLyt } from '../layouts/LandingPgLyt';
import {
  selectAuthLoading,
  selectAuthUser,
  selectRealAccessRoles,
} from '../../states/features/auth/authSelectors';

const LandingPage = () => {
  const user = useSelector(selectAuthUser);
  const userLoading = useSelector(selectAuthLoading);
  const isPreload = useSelector((state) => state.isPreload);
  const allowedRoles = useSelector(selectRealAccessRoles);
  const isLoading = userLoading || isPreload;

  return (
    <LandingPgLyt
      username={user?.fullName}
      user={user}
      allowedRoles={allowedRoles}
      isLoading={isLoading}
    />
  );
};

export default LandingPage;
