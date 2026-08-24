import { useState } from "react";
import { useLoginStore } from "../stores/loginStore";

export default function Note({
  id,
  title,
  content,
  comments,
  addComment,
  deleteComment,
  editComment,
}) {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");
  const userId = useLoginStore((s) => s.userId);

  return (
    <div className="note">
      <h3>{title}</h3>
      <p>{content}</p>

      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => addComment(id, text)}>Добавить</button>
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
                  onClick={() => {
                    editComment(c.id, editText);
                    setEditId("");
                  }}
                >
                  Сохранить
                </button>
              </>
            ) : (
              <>
                <span>{c.content}</span>
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
                    <button onClick={() => deleteComment(c.id)}>
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
