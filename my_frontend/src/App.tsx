import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import CreateNoteView from "./views/CreateNoteView";
import NoteView from "./views/NoteView";
import IndexView from "./views/IndexView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/note/create" element={<CreateNoteView />} />
          <Route path="/note/:id" element={<NoteView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/" element={<IndexView/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
