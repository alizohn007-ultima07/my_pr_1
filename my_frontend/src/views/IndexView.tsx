import { useEffect } from "react";
import { useNoteStore } from "../stores/noteStore";
import { useCommentStore } from "../stores/commentStore";
import { useAuthStore } from "../stores/authStore";
import Note from "../components/Note";
import "../styles/IndexView.css";


export default function IndexView() {
  const notes = useNoteStore((s) => s.notes);
  const loadNotes = useNoteStore((s) => s.loadNotes);
  const commentStore = useCommentStore();
  const isAuth = useAuthStore((s) => s.isAuth);

  useEffect(() => {
    if (isAuth) {
      loadNotes();
    }
  }, [isAuth]);

  useEffect(() => {
    notes.forEach((note) => {
      commentStore.loadComments(note.id);
    });
  }, [notes]);

  if (!isAuth) {
    return <div className="not-auth">Зайди для просмотра</div>;
  }

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
