// user-details.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id!: number;
  user: User = new User();

  constructor(private route: ActivatedRoute, private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data=>{
      this.user = data;
    })
  }

  goToUserList() {
    this.router.navigate(['/easyhouse/admin-home/users']);
  }

}
