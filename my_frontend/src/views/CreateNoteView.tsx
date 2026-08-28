import { useState } from "react";
import { useNoteStore } from "../stores/noteStore";
import "../styles/NoteCreate.css";

export default function CreateNoteView() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const createNote = useNoteStore((s) => s.createNote);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Введите название и текст заметки");
      return;
    }

    await createNote({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="note-create-container">
      <h2 className="note-create-title">Создать заметку</h2>

      <input
        className="note-input"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="note-textarea"
        placeholder="Текст заметки"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="note-btn" onClick={handleCreate}>
        Создать
      </button>

      {error && <div className="note-error">{error}</div>}
    </div>
  );
}
