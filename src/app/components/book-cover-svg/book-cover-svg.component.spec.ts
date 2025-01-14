import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCoverSvgComponent } from './book-cover-svg.component';

describe('BookCoverSvgComponent', () => {
  let component: BookCoverSvgComponent;
  let fixture: ComponentFixture<BookCoverSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCoverSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCoverSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
