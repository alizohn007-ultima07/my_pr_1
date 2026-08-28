import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Register from "../components/Register";

export default function RegisterView() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);

  const handleRegister = async (username: string, password: string) => {
    if (!username.trim() || !password.trim()) {
      setError("Введите логин и пароль");
      return;
    }

    const result = await register(username, password);

    if (!result.ok) {
      setError(result.error || "Ошибка регистрации");
      return;
    }

    navigate("/login");
  };

  return (
    <Register
      onSubmit={handleRegister}
      error={error}
    />
  );
}
