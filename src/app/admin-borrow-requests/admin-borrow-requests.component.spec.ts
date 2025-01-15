import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBorrowRequestsComponent } from './admin-borrow-requests.component';

describe('AdminBorrowRequestsComponent', () => {
  let component: AdminBorrowRequestsComponent;
  let fixture: ComponentFixture<AdminBorrowRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBorrowRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBorrowRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
