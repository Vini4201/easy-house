import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http'; // Import HttpParams
import { CommonModule } from '@angular/common';
import { UserRole } from '../models/user.model';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-user-list',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  error: string | null = null;
  currentUserRole: UserRole | null = null;

  constructor(private userService: UserService, private router: Router, 
    private toastService: ToastService) { }

  ngOnInit(): void {
    const userRoleString = localStorage.getItem('userRole');
    this.currentUserRole = userRoleString ? userRoleString as UserRole : null; // Convert from string to UserRole if necessary
    this.getUsers();
  }
  
  private getUsers() {
    this.userService.getUsersList().subscribe(
      data => {
        this.users = data;
        this.loading = false;
      },
      error => {
        this.error = 'Error fetching users: ' + error;
        this.loading = false;
      }
    );
  }

  userDetails(id: number) {
    this.router.navigate(['/easyhouse/user-details', id]);
  }

  updateUser(id: number) {
    this.router.navigate(['/easyhouse/update-user', id]);
  }

  deleteUser(id: number) {
    this.toastService.confirm(
      'Are you sure you want to delete this user?',
      () => {
        // Proceed with deletion if confirmed
        if (this.currentUserRole) {
          this.userService.deleteUser(id, this.currentUserRole).subscribe(
            () => {
              this.getUsers();
            },
            error => {
              this.toastService.showDanger("Error deleting user");
              console.error('Error deleting user', error);
            }
          );
        } else {
          this.toastService.showDanger("Current user role is null or undefined.")
          console.error('Current user role is null or undefined.');
        }
      }
    );
  }
}
