import { BASE_API_URL } from "./config";
import { useEffect, useState } from "react";
import type { NoteResponse } from "./types/note";
import Note from "./components/Note";
import "./App.css"
import { NoteCreate } from "./components/NoteCreate";

export default function App() {
  const [notes, setNotes] = useState<NoteResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(BASE_API_URL + "/notes")
      .then((resp) => resp.json())
      .then((data) => {
        setIsLoading(false);
        setNotes(data);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      Статус: {error && "Ошибка: " + error}
      {isLoading && "Загрузка..."}
      <div className="notes-card-container">
        {!isLoading && !error && notes.map((note) => <Note {...note}/>)}
      </div>
      <NoteCreate></NoteCreate>
    </div>
  );
}
