import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { Book } from '../models/book.model'; // Import the Book interface
import { BookGenre } from '../models/book-genre.enum'; // Import the BookGenre enum
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-books',
  imports: [CommonModule],
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css'],
})
export class AdminBooksComponent implements OnInit {
  books: Book[] = []; // Use the Book interface
  isLoading = true;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.booksService.getAllBooks().subscribe({
      next: (data: Book[]) => {
        this.books = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      },
    });
  }

  navigateToAddBook(): void {
    this.router.navigate(['/admin-panel/books/add']);
  }
  editBook(bookId: string): void {
    this.router.navigate([`/admin-panel/books/edit/${bookId}`]);
  }
  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.booksService.deleteBook(bookId).subscribe({
        next: () => {
          this.books = this.books.filter((book) => book.id !== bookId); // Remove the book from the list
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          alert('Failed to delete book');
        },
      });
    }
  }
}
