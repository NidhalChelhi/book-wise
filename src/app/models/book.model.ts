import { BookGenre } from './book-genre.enum';

export interface Book {
  id: string; // Unique identifier for the book
  title: string; // Title of the book
  author: string; // Author of the book
  genre: BookGenre; // Genre of the book (using an enum)
  rating: number; // Rating of the book
  description: string; // Description of the book
  coverColor: string; // Background color for the book cover
  coverUrl: string; // URL of the book cover image
  summary: string; // Summary of the book
  createdAt: Date; // Date when the book was created
}
