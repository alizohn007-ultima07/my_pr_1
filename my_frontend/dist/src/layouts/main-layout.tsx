import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Link to="/">Главная</Link>
        <Link to="/note/create">Создать заметку</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/login">Войти</Link>
      </nav>

      <Outlet />
    </div>
  );
}
