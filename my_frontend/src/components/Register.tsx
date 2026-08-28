  import { useState } from "react";
  import "../styles/Register.css";

  export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
      try {
        const resp = await fetch("https://learnapi-v2.kpn3o.ru", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!resp.ok) {
          setMessage("Ошибка регистрации");
          return;
        }

        setMessage("Регистрация успешна!");
        setUsername("");
        setPassword("");

        setTimeout(() => setMessage(""), 1500);
      } catch (err) {
        setMessage("Ошибка подключения к серверу");
      }
    };

    return (
      <div className="register-container">
        <h2 className="register-title">Регистрация</h2>

        <input
          className="register-input"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="register-input"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-btn" onClick={handleRegister}>
          Зарегистрироваться
        </button>

        {message && <div className="register-message">{message}</div>}
      </div>
    );
  }
