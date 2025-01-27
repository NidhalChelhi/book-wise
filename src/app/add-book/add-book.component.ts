import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { BookGenre } from '../models/book-genre.enum';
import { CreateBookDto } from '../models/create-book.dto';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class AddBookComponent implements OnInit {
  addBookForm: FormGroup;
  genres = Object.values(BookGenre);

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.addBookForm = this.fb.group({
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

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.addBookForm.valid) {
      const formValue = this.addBookForm.value;

      const id = `${formValue.title
        .toLowerCase()
        .replace(/\s+/g, '-')}-${formValue.author
        .toLowerCase()
        .replace(/\s+/g, '-')}-${formValue.genre.toLowerCase()}`;

      const genre = formValue.genre.toLowerCase() as BookGenre;

      const newBook: CreateBookDto = {
        id,
        title: formValue.title,
        author: formValue.author,
        genre,
        rating: parseFloat(formValue.rating),
        description: formValue.description,
        coverColor: formValue.coverColor,
        coverUrl: formValue.coverUrl,
        summary: formValue.summary,
      };

      this.booksService.createBook(newBook).subscribe({
        next: () => {
          this.toastr.success('Book added successfully!', 'Success');
          this.router.navigate(['/admin-panel/books']);
        },
        error: (error) => {
          console.error('Error adding book:', error);
        },
      });
    }
  }

  onColorInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const color = input.value;

    this.addBookForm.get('coverColor')?.setValue(color);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.addBookForm.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  getErrorMessage(field: string): string {
    const control = this.addBookForm.get(field);
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
