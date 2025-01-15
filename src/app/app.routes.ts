import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AdminBorrowRequestsComponent } from './admin-borrow-requests/admin-borrow-requests.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'books/:id', component: BookDetailsComponent },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'books', component: AdminBooksComponent },
      { path: 'books/add', component: AddBookComponent },
      { path: 'books/edit/:id', component: EditBookComponent },
      { path: 'borrow-requests', component: AdminBorrowRequestsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];
