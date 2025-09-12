import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { InputField } from '../elements/InputField';
import { AlertBox } from '../elements/AlertBox';
import { Button } from '../elements/Button';
import { asyncSetAuthUser } from '../../states/features/auth/authThunk';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.authUser);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(asyncSetAuthUser({ email, password }));
  };

  // Navigate ketika user berhasil login
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <form
      onSubmit={handleLogin}
      className="mt-6 w-full max-w-md animate-fadeIn space-y-4"
    >
      {/* Error Alert */}
      {error && (
        <AlertBox alertType="errorLogin" message={error} onClose={() => {}} />
      )}

      {/* Email */}
      <InputField
        id="email"
        label="Email"
        placeholder="Masukkan email yang terdaftar"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="placeholder:italic placeholder:text-base"
        required
      />

      {/* Password */}
      <InputField
        id="password"
        label="Kata Sandi"
        placeholder="Masukkan kata sandi anda"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={showPassword ? EyeOff : Eye}
        onIconClick={() => setShowPassword(!showPassword)}
        className="placeholder:italic placeholder:text-base"
        required
      />

      {/* Button Login */}
      <Button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg transition duration-300 cursor-pointer flex items-center justify-center gap-2
          ${
            loading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-900 hover:bg-blue-950 text-white'
          }
        `}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" /> Sedang masuk...
          </>
        ) : (
          'Masuk'
        )}
      </Button>
    </form>
  );
};
