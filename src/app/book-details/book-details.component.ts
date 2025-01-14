import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
import { BookOverviewComponent } from '../components/book-overview/book-overview.component';
import { HeaderComponent } from '../components/header/header.component';
import { BookCoverComponent } from '../components/book-cover/book-cover.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    BookOverviewComponent,
    HeaderComponent,
    BookCoverComponent,
  ],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;
  relatedBooks: Book[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const bookId = params.get('id');
      if (bookId) {
        this.fetchBookDetails(bookId);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  fetchBookDetails(bookId: string): void {
    this.isLoading = true;
    this.booksService.getBookById(bookId).subscribe({
      next: (data: Book) => {
        this.book = data;
        this.fetchRelatedBooks(data.genre);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching book details:', error);
        this.isLoading = false;
      },
    });
  }

  fetchRelatedBooks(genre: string): void {
    this.booksService.getBooksByGenre(genre).subscribe({
      next: (data: Book[]) => {
        this.relatedBooks = data.filter((book) => book.id !== this.book?.id);
      },
      error: (error) => {
        console.error('Error fetching related books:', error);
      },
    });
  }

  // Public method to handle navigation
  navigateToBook(bookId: string): void {
    this.router.navigate(['/books', bookId]);
  }
}
