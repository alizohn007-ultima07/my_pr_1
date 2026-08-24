import React, { useState } from "react";
import { Note } from "../types/type";

interface Props {
  note: Note;
  onDelete: (id: number) => void;
  onAddComment: (noteId: number, text: string) => void;
  onDeleteComment: (noteId: number, commentId: number) => void;
}

export default function NoteItem({ note, onDelete, onAddComment, onDeleteComment }: Props) {
  const [comment, setComment] = useState("");

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>{note.title}</h3>

      <button onClick={() => onDelete(note.id)}>Удалить заметку</button>

      <ul>
        {note.comments.map(c => (
          <li key={c.id}>
            {c.text}
            <button onClick={() => onDeleteComment(note.id, c.id)}>X</button>
          </li>
        ))}
      </ul>

      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Комментарий"
      />
      <button onClick={() => { onAddComment(note.id, comment); setComment(""); }}>
        Добавить комментарий
      </button>
    </div>
  );
}
