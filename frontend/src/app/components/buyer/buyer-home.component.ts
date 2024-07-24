import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { Property } from '../../models/property';
import { BuyerService } from './buyer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PropertyListComponentbuyer } from './property-list-buyer/property-list.component';
import { AuthService } from '../../services/auth.service';
import { BookingComponent } from './booking/booking.component';
import { CartComponent } from './cart/cart.component';
import { PropertyDetailComponentbuyer } from './property-detail-buyer/property-detail.component';

@Component({
  selector: 'app-buyer-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    BookingComponent,
    PropertyListComponentbuyer,
    CartComponent,
    PropertyDetailComponentbuyer,
  ],
  templateUrl: './buyer-home.component.html',
  styleUrl: './buyer-home.component.css'
})
export class BuyerHomeComponent implements OnInit {

  @Input() buyerId!: number;

  constructor(
    private buyerService: BuyerService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    const loggedInUser = this.authService.getLoggedInUser();
    console.log(loggedInUser)
    console.log("Logged in user id",loggedInUser['userId']);
    if(loggedInUser){
      this.buyerId = loggedInUser['userId'];
      console.log("Logged in buyer user ID", this.buyerId);
      console.log("Logged in user data",loggedInUser);
    } else {
      console.error('User not logged in');
    }

  }

//   logout() {
//     this.authService.logout().subscribe({
//       next: (response) => {
//         console.log('Logout successful', response);
//         this.router.navigate(['/login']);
//       },
//       error: (error) => {
//         console.error('Logout error', error);
//       }
//     });
//   }


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

  onBuyerIdChange(buyerId: number): void{
    this.buyerId = buyerId;
    console.log(buyerId);
  }
}
