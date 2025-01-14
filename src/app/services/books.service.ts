import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book } from '../models/book.model';
import { CreateBookDto } from '../models/create-book.dto';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = environment.apiUrl;

  http = inject(HttpClient);

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  getBookCopies(bookId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/book-copies/book/${bookId}`);
  }

  // Fetch a book by ID
  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${bookId}`);
  }

  // Fetch books by genre
  getBooksByGenre(genre: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books?genre=${genre}`);
  }

  // Create a new book
  createBook(book: CreateBookDto): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  // Delete a book
  deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${bookId}`);
  }

  // Update a book
  updateBook(bookId: string, book: CreateBookDto): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${bookId}`, book);
  }
}
