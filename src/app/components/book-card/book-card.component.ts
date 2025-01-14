// book-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookCoverComponent } from '../book-cover/book-cover.component';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterModule, BookCoverComponent],
  template: `
    <li>
      <a [routerLink]="['/books', book.id]">
        <app-book-cover
          [coverColor]="book.coverColor"
          [coverImage]="book.coverUrl"
        >
        </app-book-cover>

        <div class="mt-4 xs:max-w-40 max-w-28">
          <p class="mt-2 font-semibold text-white text-xl ">
            {{ book.title }} by {{ book.author }}
          </p>
          <p class="mt-1 text-base text-light-100 italic">
            {{ book.genre | titlecase }}
          </p>
        </div>
      </a>
    </li>
  `,
})
export class BookCardComponent {
  @Input() book!: Book;
}
