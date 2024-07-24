import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User = new User();
  admins: User[] = [];
  selectedAdminId: number | null = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.userService.getUsersByRole('ADMIN').subscribe((data: User[]) => {
      this.admins = data;
      console.log('Admins loaded:', this.admins);  // Add this line to debug
    }, error => {
      console.error('Error fetching admins', error);
    });
  }

  fetchAdminData() {
    if (this.selectedAdminId !== null) {
      this.userService.getUserById(this.selectedAdminId).subscribe((data: User) => {
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
        this.user.userName = data.userName;
        this.user.phone = data.phone;
        this.user.email = data.email;
        this.user.address = data.address;
      }, error => {
        console.error('Error fetching admin data', error);
      });
    } else {
      this.resetForm();
    }
  }

  resetForm() {
    this.user = new User();
  }

  saveUser() {
    this.userService.createUser(this.user).subscribe(data => {
      console.log(data);
      this.goToUserList();
    }, error => {
      console.error(error);
    });
  }

  goToUserList() {
    this.router.navigate(['/easyhouse/admin-home/users']);
  }

  onReset() {
    // Reset the form fields
    this.user = new User();
    this.selectedAdminId = null;
  }

  onSubmit() {
    console.log(this.user);
    this.saveUser();
  }
}
