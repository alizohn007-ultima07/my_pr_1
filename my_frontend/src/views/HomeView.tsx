import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNoteStore } from "../stores/noteStore";
import { FaPlus, FaTrash, FaEye } from "react-icons/fa";
import "../styles/Notes.css";
import "../styles/Home.css"
export default function HomeView() {
  const navigate = useNavigate();

  const notes = useNoteStore((s) => s.notes);
  const loadNotes = useNoteStore((s) => s.loadNotes);
  const deleteNote = useNoteStore((s) => s.deleteNote);

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Мои заметки</h1>

      <div className="home-actions">
        <button
          className="home-btn"
          onClick={() => navigate("/note/create")}
        >
          <FaPlus className="note-icon" /> Создать заметку
        </button>
      </div>

      <div className="notes-list">
        {notes.length === 0 && (
          <div style={{ textAlign: "center", opacity: 0.7 }}>
            У вас пока нет заметок
          </div>
        )}

        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <div className="note-title">{note.title}</div>
            <div className="note-content">{note.content}</div>

            <div className="note-actions">
              <FaEye
                className="note-icon"
                onClick={() => navigate(`/note/${note.id}`)}
              />

              <FaTrash
                className="note-icon delete-icon"
                onClick={() => deleteNote(note.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
