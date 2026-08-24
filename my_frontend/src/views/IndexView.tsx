import { useEffect } from "react";
import { useNoteStore } from "../stores/noteStore";
import { useLoginStore } from "../stores/loginStore";
import { useCommentStore } from "../stores/commentStore";
import Note from "../components/Note";

export default function IndexView() {
  const notes = useNoteStore((s) => s.notes);
  const loadNotes = useNoteStore((s) => s.loadNotes);
  const userId = useLoginStore((s) => s.userId);
  const commentStore = useCommentStore();

  useEffect(() => {
    if (userId) loadNotes();
  }, [userId]);

  useEffect(() => {
    notes.forEach((note) => {
      commentStore.loadComments(note.id);
    });
  }, [notes]);

  if (!Array.isArray(notes)) return null;

  return (
    <div className="notes-card-container">
      {notes.map((note) => (
        <Note
          key={note.id}
          {...note}
          comments={commentStore.getComments(note.id)}
          addComment={commentStore.addComment}
          deleteComment={commentStore.deleteComment}
          editComment={commentStore.editComment}
        />
      ))}
    </div>
  );
}
