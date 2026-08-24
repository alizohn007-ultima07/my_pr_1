export interface Comment {
  id: number;
  text: string;
}

export interface Note {
  id: number;
  title: string;
  comments: Comment[];
}

export interface NoteResponse {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author: string;
  created_at: Date;
  updated_at: Date;
}
