export interface Comment {
  id: number;
  text: string;
}

export interface Note {
  id: number;
  title: string;
  comments: Comment[];
}
