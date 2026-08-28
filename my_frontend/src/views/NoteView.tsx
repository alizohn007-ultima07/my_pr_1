import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNoteStore } from "../stores/noteStore";
import "../styles/NoteView.css";

export default function NoteView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const notes = useNoteStore((s) => s.notes);
  const loadNotes = useNoteStore((s) => s.loadNotes);

  const [note, setNote] = useState<any>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    const found = notes.find((n) => n.id === id);
    setNote(found || null);
  }, [notes, id]);

  if (!note) {
    return (
      <div className="note-view-container">
        <h2>Заметка не найдена</h2>
        <button className="note-back-btn" onClick={() => navigate("/")}>
          Назад
        </button>
      </div>
    );
  }

  return (
    <div className="note-view-container">
      <h1 className="note-view-title">{note.title}</h1>

      <p className="note-view-content">{note.content}</p>

      <button className="note-back-btn" onClick={() => navigate("/")}>
        ← Вернуться к заметкам
      </button>
    </div>
  );
}
