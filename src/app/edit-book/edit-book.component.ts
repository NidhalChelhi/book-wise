import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../services/books.service';
import { BookGenre } from '../models/book-genre.enum';
import { CreateBookDto } from '../models/create-book.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class EditBookComponent implements OnInit {
  editBookForm: FormGroup;
  genres = Object.values(BookGenre);
  bookId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editBookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      genre: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      coverColor: [
        '#000000',
        [
          Validators.required,
          Validators.pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        ],
      ],
      coverUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      summary: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.fetchBookDetails(this.bookId);
    }
  }

  fetchBookDetails(bookId: string): void {
    this.booksService.getBookById(bookId).subscribe({
      next: (book) => {
        this.editBookForm.patchValue({
          title: book.title,
          author: book.author,
          genre: book.genre,
          rating: book.rating,
          description: book.description,
          coverColor: book.coverColor,
          coverUrl: book.coverUrl,
          summary: book.summary,
        });
      },
      error: (error) => {
        console.error('Error fetching book details:', error);
      },
    });
  }

  onSubmit(): void {
    if (this.editBookForm.valid && this.bookId) {
      const updatedBook: CreateBookDto = {
        id: this.bookId,
        ...this.editBookForm.value,
      };

      this.booksService.updateBook(this.bookId, updatedBook).subscribe({
        next: () => {
          this.router.navigate(['/admin-panel/books']);
        },
        error: (error) => {
          console.error('Error updating book:', error);
        },
      });
    }
  }

  // Handle color input changes
  onColorInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const color = input.value;
    this.editBookForm.get('coverColor')?.setValue(color);
  }

  // Helper method to check if a field is invalid
  isFieldInvalid(field: string): boolean {
    const control = this.editBookForm.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  // Helper method to get validation messages
  getErrorMessage(field: string): string {
    const control = this.editBookForm.get(field);
    if (control?.errors?.['required']) {
      return 'This field is required';
    }
    if (control?.errors?.['maxlength']) {
      return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
    }
    if (control?.errors?.['min'] || control?.errors?.['max']) {
      return 'Rating must be between 0 and 5';
    }
    if (control?.errors?.['pattern']) {
      if (field === 'coverColor') {
        return 'Please enter a valid hex color code (e.g., #000000 or #fff)';
      }
      return 'Please enter a valid URL';
    }
    return '';
  }
}
