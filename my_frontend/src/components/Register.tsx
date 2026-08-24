import { useEffect, useState } from "react";
import { BASE_API_URL } from "../config";
import "../styles/Register.css";

export default function Register() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (
      login.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [login, email, password, confirmPassword]);

  return (
    <div className="container">
      <input
        value={login}
        onChange={(ev) => setLogin(ev.target.value)}
        placeholder="Логин"
      ></input>
      <input
        value={email}
        onChange={(ev) => {
          setEmail(ev.target.value);
        }}
        placeholder="E-mail"
        type="email"
      ></input>
      <input
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        placeholder="Пароль"
        type="password"
      ></input>
      <input
        value={confirmPassword}
        onChange={(ev) => {
          setConfirmPassword(ev.target.value);
        }}
        placeholder="Подтверждение пароля"
        type="password"
      ></input>
      <button
        onClick={() => {
          fetch(BASE_API_URL + "/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: login,
              password: password,
              email: email,
            }),
          })
            .then((resp) => resp.json())
            .then((data) => alert(data));
        }}
        disabled={!isValid}
      >
        Зарегистрироваться
      </button>
    </div>
  );
}