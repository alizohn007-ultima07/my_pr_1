import { useState } from "react";
import { useLoginStore } from "../stores/loginStore";

export default function Login() {
  const loginStore = useLoginStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await loginStore.login(username, password);
  };

  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}
