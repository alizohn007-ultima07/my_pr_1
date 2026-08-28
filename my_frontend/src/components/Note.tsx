import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import type { Comment } from "../stores/commentStore";
import "../styles/NoteCard.css";


type Props = {
  id: string;
  title: string;
  content: string;
  comments: Comment[];
  addComment: (noteId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  editComment: (commentId: string, content: string) => Promise<void>;
};

export default function Note({
  id,
  title,
  content,
  comments,
  addComment,
  deleteComment,
  editComment,
}: Props) {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const userId = useAuthStore((s) => s.userId);

  return (
    <div className="note">
      <h3>{title}</h3>
      <p>{content}</p>

      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Комментарий"
        />
        <button
          onClick={async () => {
            if (!text.trim()) return;
            await addComment(id, text);
            setText("");
          }}
        >
          Добавить
        </button>
      </div>

      <div>
        {comments.map((c) => (
          <div key={c.id}>
            {editId === c.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  onClick={async () => {
                    await editComment(c.id, editText);
                    setEditId(null);
                  }}
                >
                  Сохранить
                </button>
              </>
            ) : (
              <>
                <span>
                  {c.author_username}: {c.content}
                </span>

                {c.author_id === userId && (
                  <>
                    <button
                      onClick={() => {
                        setEditId(c.id);
                        setEditText(c.content);
                      }}
                    >
                      Редактировать
                    </button>

                    <button
                      onClick={async () => {
                        await deleteComment(c.id);
                      }}
                    >
                      Удалить
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
