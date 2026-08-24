import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Введите логин и пароль");
      return;
    }

    const result = await login(username, password);

    if (!result.ok) {
      setError(result.error || "Ошибка входа");
      return;
    }

    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Вход</h2>

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

        <button type="submit">Войти</button>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  );
}
