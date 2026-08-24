import React from "react";

interface NoteTagProps {
  text: string;
  color?: string;
}

export default function NoteTag({ text, color = "#d0f0ff" }: NoteTagProps) {
  return (
    <div style={{ backgroundColor: color }} className="note-tag-pill">
      {text}
    </div>
  );
}
