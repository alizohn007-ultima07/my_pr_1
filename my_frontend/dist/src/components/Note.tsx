import type { NoteResponse } from "../types/note";
import NoteTag from "./NoteTag";

export default function Note(note: NoteResponse) {
  return (
    <div className="note-card">
      <div className="note-title">{note.title}</div>
      <div className="note-content">{note.content}</div>
      <div className="note-tags-row">
        {note.tags.map((t) => {
          return <NoteTag text={t}/>;
        })}
      </div>
      <div className="note-author">Автор: {note.author}</div>
    </div>
  );
}