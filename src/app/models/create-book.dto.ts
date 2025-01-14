import { BookGenre } from './book-genre.enum';

export interface CreateBookDto {
  id: string;
  title: string;
  author: string;
  genre: BookGenre;
  rating: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  summary: string;
}
