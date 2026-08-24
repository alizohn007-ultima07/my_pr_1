export type NoteCreate = {
  title: string;
  content: string;
  tags: string[];
};

export type NoteResponse = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author: string;
  created_at: Date;
  updated_at: Date;
};