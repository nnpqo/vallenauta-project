
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string|null;
  content: string;
  inLibrary?: boolean;
}
