import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { BuyerHomeComponent } from '../../components/buyer/buyer-home.component';
import { AdminHomeComponent } from '../../components/admin-home/admin-home.component';
import { SellerHomeComponent } from '../../seller-home/seller-home.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    BuyerHomeComponent,
    AdminHomeComponent,
    SellerHomeComponent,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Input() buyerId!: number
  isLoggedIn: boolean = false;
  currentUserRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });

    // Get current user role
    this.currentUserRole = this.authService.getCurrentUserRole();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful', response);
        // Clear relevant items from local storage
        localStorage.removeItem('id');
        localStorage.removeItem('userRole');
        localStorage.removeItem('sellerId');
        localStorage.removeItem('adminId');
        this.router.navigate(['/easyhouse/home']); // Redirect to home page or login page
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
  }
}
