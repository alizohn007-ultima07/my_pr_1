import { Note } from "../types/note";
import NoteItem from "./NoteItem";

interface Props {
  notes: Note[];
  onDelete: (id: number) => void;
  onAddComment: (noteId: number, text: string) => void;
  onDeleteComment: (noteId: number, commentId: number) => void;
}

const NoteList: React.FC<Props> = ({ notes, onDelete, onAddComment, onDeleteComment }) => {
  return (
    <div>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </div>
  );
};

export default NoteList;
