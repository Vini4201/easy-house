import { Component, NgModule,OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [ FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent {
  // adminForm!: FormGroup;
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {
    this.user.userRole = 'ADMIN'; // Ensure userRole is set to ADMIN
  }

  saveUser() {
    this.userService.createUser(this.user).subscribe(data => {
      console.log(data);
      this.goToUserList();
    },
    error => console.log(error));
  }

  goToUserList() {
    this.router.navigate(['/easyhouse/admin-home/users']);
  }

  onSubmit() {
    console.log(this.user);
    this.saveUser();
  }
}

// Manually bootstrap FormsModule

export class CreateAdminModule {}
