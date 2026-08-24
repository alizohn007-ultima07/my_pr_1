import { useState } from "react";
import { useAuthStore } from "../stores/authStore";

export default function LoginView() {
  const login = useAuthStore((state) => state.login);
  const [status, setStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
      <input
        value={formData.login}
        onChange={(ev) =>
          setFormData({
            ...formData,
            login: ev.target.value,
          })
        }
        placeholder="Логин"
      />

      <input
        value={formData.password}
        onChange={(ev) =>
          setFormData({
            ...formData,
            password: ev.target.value,
          })
        }
        placeholder="Пароль"
        type="password"
      />

      {status && <p>{status}</p>}

      <button
        onClick={async () => {
          const res = await login({
            username: formData.login,
            password: formData.password,
          });

          if (res.success) {
            setStatus("Успешный вход!");
          } else {
            setStatus(res.error);
          }
        }}
      >
        Войти
      </button>
    </div>
  );
}
