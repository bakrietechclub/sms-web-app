import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import InputField from "../elements/InputField";
import AlertBox from "../elements/AlertBox";
import Button from "../elements/Button"

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowPage(true), 300);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    if (email !== "vanno@gmail.com" || password !== "vanno123") {
      setError("Email dan kata sandi tidak cocok. Hubungi Super Admin.");
      setShowAlert(true);
    } else {
      setError("");
      alert("Login berhasil");
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
    <form onSubmit={handleLogin} className={`mt-6 w-full max-w-md animate-fadeIn`}>
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

      <Button type="submit">Masuk</Button>
    </form>
  );
};

export default LoginForm;
