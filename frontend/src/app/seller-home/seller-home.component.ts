import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router,RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {

  constructor(private authService: AuthService, private router: Router) {}

    //-------------- LOGOUT RED BUTTON WORKING ----------------

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

}
