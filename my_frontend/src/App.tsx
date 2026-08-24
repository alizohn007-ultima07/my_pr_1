import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexView from "./views/IndexView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </BrowserRouter>
  );
}
