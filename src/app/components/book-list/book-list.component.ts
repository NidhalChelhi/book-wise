import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../book-card/book-card.component';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  template: `
    <section *ngIf="books.length >= 2" [class]="containerClassName">
      <h2 class="font-bold text-4xl text-light-100">{{ title }}</h2>

      <ul
        class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 mt-6"
      >
        <app-book-card *ngFor="let book of books" [book]="book">
        </app-book-card>
      </ul>
    </section>
  `,
})
export class BookListComponent {
  @Input() title!: string;
  @Input() books: Book[] = [];
  @Input() containerClassName?: string;
}
