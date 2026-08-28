import { useState } from "react";
import type { NoteCreate } from "../types/note";
import NoteTag from "./NoteTag";
import "../styles/NoteCreate.css";
import { useNoteStore } from "../stores/noteStore";

export default function NoteCreate() {
  const [note_data, setNoteData] = useState<NoteCreate>({
    content: "",
    tags: [],
    title: "",
  });

  const [add_tag_flag, setAddTagFlag] = useState(false);
  const [new_tag_text, setNewTagText] = useState("");

  const createNote = useNoteStore((state) => state.create);

  return (
    <div className="note-create-container">
      <div>
        <label htmlFor="note-title-input">имя автора:</label>
        <input
          className="note-input"
          value={note_data.title}
          onChange={(ev) =>
            setNoteData({
              ...note_data,
              tags: [...note_data.tags],
              title: ev.target.value,
            })
          }
          id="note-title-input"
        />
      </div>

      <div>
        <textarea
          className="note-textarea"
          value={note_data.content}
          onChange={(ev) =>
            setNoteData({
              ...note_data,
              tags: [...note_data.tags],
              content: ev.target.value,
            })
          }
        />
      </div>

      <div>
        {note_data.tags.map((tag, index) => (
          <NoteTag key={index} text={tag} />
        ))}

        {add_tag_flag ? (
          <NoteTag
            text={new_tag_text}
            allow_edit={true}
            lost_focus_handler={() => {
              setNoteData({
                ...note_data,
                tags: [...note_data.tags, new_tag_text],
              });
              setNewTagText("");
              setAddTagFlag(false);
            }}
            change_handler={(ev) => setNewTagText(ev.target.value)}
          />
        ) : (
          <button
            className="add-tag-button"
            onClick={() => setAddTagFlag(true)}
          >
            +
          </button>
        )}
      </div>

      <button
        className="note-create-btn"
        onClick={async () => {
          await createNote(note_data);
        }}
      >
        Создать
      </button>
    </div>
  );
}
