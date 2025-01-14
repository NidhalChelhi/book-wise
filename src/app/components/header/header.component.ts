import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  userEmail: string | null = null;
  userFullName: string | null = null;

  ngOnInit(): void {
    this.decodeToken();
  }

  decodeToken(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userEmail = decodedToken.email;
        this.userFullName = decodedToken.fullName;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.userEmail = null;
    this.router.navigate(['/sign-in']);
  }
}
