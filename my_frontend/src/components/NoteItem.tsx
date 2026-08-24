import { Note } from "../types/note";

interface Props {
  note: Note;
  onDelete: (id: number) => void;
  onAddComment: (noteId: number, text: string) => void;
  onDeleteComment: (noteId: number, commentId: number) => void;
}

const NoteItem: React.FC<Props> = ({
  note,
  onDelete,
  onAddComment,
  onDeleteComment,
}) => {
  return (
    <div className="note-card">
      <h2>{note.title}</h2>
      <p>{note.content}</p>

      <h3>Комментарии</h3>

      <ul>
        {note.comments?.map((c) => (
          <li key={c.id}>
            <span>{c.text}</span>

            <button onClick={() => onDeleteComment(note.id, c.id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Введите комментарий..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const value = (e.target as HTMLInputElement).value;
            if (value.trim()) {
              onAddComment(note.id, value);
              (e.target as HTMLInputElement).value = "";
            }
          }
        }}
      />

      <button onClick={() => onDelete(note.id)}>Удалить заметку</button>
    </div>
  );
};

export default NoteItem;
