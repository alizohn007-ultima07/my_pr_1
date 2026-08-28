import { Outlet, Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function MainLayout() {
  return (
    <div className="layout">
      <nav className="nav">
        <div className="nav-center">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/note/create" className="nav-link">Создать заметку</Link>
          <Link to="/register" className="nav-link">Регистрация</Link>
          <Link to="/login" className="nav-link">Войти</Link>
        </div>
      </nav>

      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
