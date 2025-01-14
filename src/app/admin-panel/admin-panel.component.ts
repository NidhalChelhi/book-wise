import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admin-panel',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {
  constructor(private router: Router) {}
  userFullName: string | null = null;

  ngOnInit(): void {
    this.decodeToken();
  }

  decodeToken(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userFullName = decodedToken.fullName;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }
}
