import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  userEmail: string | null = null;
  userFullName: string | null = null;
  isCollapsed = false;
  isSmallScreen = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  ngOnInit(): void {
    this.decodeToken();
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    const windowWidth = window.innerWidth;
    this.isSmallScreen = windowWidth < 1200;
    this.isCollapsed = this.isSmallScreen;
  }

  toggleSidebar(): void {
    if (!this.isSmallScreen) {
      this.isCollapsed = !this.isCollapsed;
    }
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

  navItems = [
    { path: '/admin-panel/home', icon: '/icons/admin/home.svg', label: 'Home' },
    {
      path: '/admin-panel/users',
      icon: '/icons/admin/users.svg',
      label: 'All Users',
    },
    {
      path: '/admin-panel/books',
      icon: '/icons/admin/book.svg',
      label: 'All Books',
    },
    {
      path: '/admin-panel/borrow-requests',
      icon: '/icons/admin/bookmark.svg',
      label: 'Borrow Requests',
    },
    {
      path: '/admin-panel/users-requests',
      icon: '/icons/admin/user.svg',
      label: 'Account Requests',
    },
  ];

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
