import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/note/create">Создать заметку</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/login">Войти</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}