import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function RegisterView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    <div className="auth-container">
      <h2>Регистрация</h2>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Создать аккаунт</button>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  );
}
