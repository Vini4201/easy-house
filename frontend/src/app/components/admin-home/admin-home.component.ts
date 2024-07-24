import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterModule,RouterLink, RouterLinkActive],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  constructor(private authService: AuthService, private router: Router) {}


  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful', response);
        localStorage.removeItem('sellerId'); // Clear sellerId from local storage
        this.router.navigate(['/easyhouse/login']); // Redirect to login page
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
  }
  
  // logout() {
  //   this.authService.logout().subscribe({
  //     next: (response) => {
  //       console.log('Logout successful', response);
  //       this.router.navigate(['/login']);
  //     },
  //     error: (error) => {
  //       console.error('Logout error', error);
  //     }
  //   });
  // }

}
