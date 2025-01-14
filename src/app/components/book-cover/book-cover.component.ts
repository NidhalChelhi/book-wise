// book-cover.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCoverSvgComponent } from '../book-cover-svg/book-cover-svg.component';

type BookCoverVariant = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide';

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: 'book-cover_extra_small',
  small: 'book-cover_small',
  medium: 'book-cover_medium',
  regular: 'book-cover_regular',
  wide: 'book-cover_wide',
};

@Component({
  selector: 'app-book-cover',
  standalone: true,
  imports: [CommonModule, BookCoverSvgComponent],
  template: `
    <div [class]="containerClasses">
      <app-book-cover-svg [coverColor]="coverColor" />

      <div class="absolute z-10" [style]="imageContainerStyle">
        <img
          [src]="coverImage"
          alt="Book cover"
          class="rounded-sm object-fill w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class BookCoverComponent {
  @Input() variant: BookCoverVariant = 'regular';
  @Input() coverColor: string = '#012B48';
  @Input() coverImage: string = 'https://placehold.co/400x600.png';
  @Input() class?: string;

  get containerClasses(): string {
    return `relative transition-all duration-300 ${
      variantStyles[this.variant]
    } ${this.class || ''}`;
  }

  get imageContainerStyle() {
    return {
      left: '12%',
      width: '87.5%',
      height: '88%',
    };
  }
}
