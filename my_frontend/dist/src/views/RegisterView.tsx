import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function RegisterView() {
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password_confirm: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.password_confirm) {
      setError("Пароли не совпадают");
      return;
    }

    const res = await register({
      email: formData.email,
      password: formData.password,
      username: formData.username,
    });

    if (!res.success) {
      setError(res.error);
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
      <input
        value={formData.username}
        onChange={(ev) => handleChange("username", ev.target.value)}
        placeholder="Логин"
      />

      <input
        value={formData.email}
        onChange={(ev) => handleChange("email", ev.target.value)}
        placeholder="E-Mail"
      />

      <input
        value={formData.password}
        onChange={(ev) => handleChange("password", ev.target.value)}
        placeholder="Пароль"
        type="password"
      />

      <input
        value={formData.password_confirm}
        onChange={(ev) => handleChange("password_confirm", ev.target.value)}
        placeholder="Повторите пароль"
        type="password"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSubmit}>Зарегистрироваться</button>
    </div>
  );
}
