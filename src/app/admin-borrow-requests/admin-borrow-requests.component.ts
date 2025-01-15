// admin-borrow-requests.component.ts
import { Component, OnInit } from '@angular/core';
import { BorrowRequestsService } from '../services/borrow-requests.service';
import { UsersService } from '../services/users.service';
import { BooksService } from '../services/books.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-borrow-requests',
  templateUrl: './admin-borrow-requests.component.html',
  styleUrls: ['./admin-borrow-requests.component.css'],
  imports: [CommonModule],
})
export class AdminBorrowRequestsComponent implements OnInit {
  requests: any[] = [];
  isLoading = true;

  constructor(
    private borrowRequestsService: BorrowRequestsService,
    private usersService: UsersService,
    private booksService: BooksService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchBorrowRequests();
  }

  fetchBorrowRequests(): void {
    this.borrowRequestsService.getAllBorrowRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.fetchAdditionalDetails();
        this.isLoading = false;
        console.log(this.requests);
      },
      error: (error) => {
        console.error('Error fetching requests:', error);
        this.toastr.error('Failed to fetch borrow requests.');
        this.isLoading = false;
      },
    });
  }

  fetchAdditionalDetails(): void {
    this.requests.forEach((request) => {
      // Fetch user details
      this.usersService.getUserById(request.userId).subscribe({
        next: (user) => {
          request.user = user;
        },
        error: (error) => {
          console.error('Error fetching user details:', error);
          request.user = { fullName: 'Unknown User' };
        },
      });

      // Fetch book copy details
      this.booksService.getBookCopyById(request.bookCopyId).subscribe({
        next: (bookCopy) => {
          request.bookCopy = bookCopy;

          // Fetch book details using bookId from bookCopy
          this.booksService.getBookById(bookCopy.bookId).subscribe({
            next: (book) => {
              request.book = book; // Add book details to the request object
            },
            error: (error) => {
              console.error('Error fetching book details:', error);
              request.book = { title: 'Unknown Book' }; // Fallback if book fetch fails
            },
          });
        },
        error: (error) => {
          console.error('Error fetching book copy details:', error);
          request.bookCopy = { copyId: 'Unknown Copy' }; // Fallback if book copy fetch fails
        },
      });
    });
  }

  approveRequest(requestId: string): void {}

  rejectRequest(requestId: string): void {}
}
