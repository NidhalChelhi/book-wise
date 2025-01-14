import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  isLoading = true;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      },
    });
  }

  viewIdCard(idCardUrl: string): void {
    window.open(idCardUrl, '_blank'); // Open ID card in a new tab
  }

  editUser(userId: number): void {
    this.router.navigate([`/admin-panel/users/edit/${userId}`]);
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
    }
  }
}
