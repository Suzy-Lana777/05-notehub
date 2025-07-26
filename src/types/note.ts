export type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

// #0"Work"
// #1"Personal"
// #2"Meeting"
// #3"Shopping"
// #4"Todo"
