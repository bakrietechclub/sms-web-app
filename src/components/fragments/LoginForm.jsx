import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";

import { InputField } from "../elements/InputField";
import { AlertBox } from "../elements/AlertBox";
import { Button } from "../elements/Button";

// Data user
const users = [
  {
    email: "vanno@gmail.com",
    password: "vanno123",
    username: "Vanno",
    role: "Admin Universitas",
    division: "PD",
  },
  {
    email: "media@gmail.com",
    password: "media123",
    username: "MediaUser",
    role: "Admin Media",
    division: "SDI",
  },
  {
    email: "ingo@gmail.com",
    password: "ingo123",
    username: "IngoUser",
    role: "IT",
  },
];

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      setError("Email dan kata sandi tidak cocok. Hubungi Super Admin.");
      setShowAlert(true);
    } else {
      const userData = {
        username: foundUser.username,
        role: foundUser.role,
        division: foundUser.division,
      };
      dispatch(login(userData));
      localStorage.setItem("user", JSON.stringify(userData)); // <-- Save ke localStorage
      navigate("/home");
    }
  };

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <form
      onSubmit={handleLogin}
      className="mt-6 w-full max-w-md animate-fadeIn"
    >
      {showAlert && (
        <AlertBox
          message={error}
          onClose={() => {
            setError("");
            setShowAlert(false);
          }}
        />
      )}

      <InputField
        id="email"
        label="Email"
        placeholder="Masukkan email yang terdaftar"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        className="placeholder:italic placeholder:text-base"
      />

      <InputField
        id="password"
        label="Kata Sandi"
        placeholder="Masukkan kata sandi anda"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
        icon={showPassword ? EyeOff : Eye}
        onIconClick={() => setShowPassword(!showPassword)}
        className="placeholder:italic placeholder:text-base"
      />

      <Button
        type="submit"
        className="w-full py-2 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition duration-300 cursor-pointer"
      >
        Masuk
      </Button>
    </form>
  );
};
