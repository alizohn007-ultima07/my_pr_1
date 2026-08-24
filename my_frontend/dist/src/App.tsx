import React, { useState } from "react";
import { Note } from "./types/type";
import NoteList from "./components/NoteList";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");

  const addNote = () => {
    if (!title.trim()) return;

    const newNote: Note = {
      id: Date.now(),
      title,
      comments: []
    };

    setNotes([...notes, newNote]);
    setTitle("");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const addComment = (noteId: number, text: string) => {
    setNotes(notes.map(n =>
      n.id === noteId
        ? { ...n, comments: [...n.comments, { id: Date.now(), text }] }
        : n
    ));
  };

  const deleteComment = (noteId: number, commentId: number) => {
    setNotes(notes.map(n =>
      n.id === noteId
        ? { ...n, comments: n.comments.filter(c => c.id !== commentId) }
        : n
    ));
  };

  return (
    <div className="container">
      <h2>Заметки</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название заметки"
      />
      <button onClick={addNote}>Добавить</button>

      <NoteList
        notes={notes}
        onDelete={deleteNote}
        onAddComment={addComment}
        onDeleteComment={deleteComment}
      />
    </div>
  );
};

export default App;
