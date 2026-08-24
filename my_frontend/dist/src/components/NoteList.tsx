import React from "react";
import { Note } from "../types/type";
import NoteItem from "./NoteItem";

interface Props {
  notes: Note[];
  onDelete: (id: number) => void;
  onAddComment: (noteId: number, text: string) => void;
  onDeleteComment: (noteId: number, commentId: number) => void;
}

export default function NoteList({ notes, onDelete, onAddComment, onDeleteComment }: Props) {
  return (
    <div>
      {notes.map(note => (
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
}
