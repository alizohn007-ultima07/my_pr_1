import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import "../styles/Login.css";

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
      setError(result.error || "Неверный логин или пароль");
      return;
    }

    navigate("/");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Вход</h2>

      <form onSubmit={onSubmit}>
        <input
          className="login-input"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="login-input"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" type="submit">
          Войти
        </button>
      </form>

      {error && <div className="login-error">{error}</div>}
    </div>
  );
}
