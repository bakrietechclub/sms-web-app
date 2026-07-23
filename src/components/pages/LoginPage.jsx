import { AuthLayout } from '../layouts/AuthLayout';
import { LoginForm } from '../fragments/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
