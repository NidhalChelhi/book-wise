import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookOverviewComponent } from '../components/book-overview/book-overview.component';
import { BookListComponent } from '../components/book-list/book-list.component';
import { HeaderComponent } from '../components/header/header.component';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    BookOverviewComponent,
    BookListComponent,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  books: Book[] = []; // Use the Book interface
  featuredBook: Book | null = null; // Initialize as null
  featuredBookCopies: any[] = [];
  isLoading = true;

  // Calculate total and available copies
  get totalCopies(): number {
    return this.featuredBookCopies.length;
  }

  get availableCopies(): number {
    return this.featuredBookCopies.filter((copy) => copy.status === 'available')
      .length;
  }

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.booksService.getAllBooks().subscribe({
      next: (data: Book[]) => {
        this.books = data;
        this.featuredBook = data[6]; // Set the featured book after data is fetched
        this.isLoading = false;
        console.log(data);

        // Fetch book copies only after featuredBook is set
        if (this.featuredBook) {
          this.fetchBookCopies();
        }
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      },
    });
  }

  fetchBookCopies(): void {
    if (!this.featuredBook) {
      console.error('Featured book is not available.');
      return;
    }

    this.booksService.getBookCopies(this.featuredBook.id).subscribe({
      next: (data: any[]) => {
        this.featuredBookCopies = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching book copies:', error);
      },
    });
  }
}
