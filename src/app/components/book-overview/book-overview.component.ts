import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCoverComponent } from '../book-cover/book-cover.component';

@Component({
  selector: 'app-book-overview',
  standalone: true,
  imports: [CommonModule, BookCoverComponent],
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css'],
})
export class BookOverviewComponent {
  @Input() title!: string;
  @Input() author!: string;
  @Input() genre!: string;
  @Input() rating!: number;
  @Input() totalCopies!: number;
  @Input() availableCopies!: number;
  @Input() description!: string;
  @Input() coverColor!: string;
  @Input() coverUrl!: string;
}
