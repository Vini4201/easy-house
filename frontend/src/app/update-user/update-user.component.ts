import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule here

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  id: number = 0;
  user: User = new User();
  originalUser: User = new User();
  currentUserRole: string = '';

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
      console.log(this.user)
      this.originalUser = { ...data }; // store the original user details
      this.currentUserRole = this.user.userRole; 
    }, error => console.log(error));

  }

  onSubmit() {
    this.userService.updateUser(this.id, this.user, this.currentUserRole).subscribe(data => {
      this.goToUserList();
    }, error => console.log(error));
  }

  onReset() {
    // Reset the form to its original state
    this.user = { ...this.originalUser };
  }

  goToUserList() {
    this.router.navigate(['/easyhouse/admin-home/users']);
  }
}
