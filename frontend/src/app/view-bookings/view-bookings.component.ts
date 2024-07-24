import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.model';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-view-bookings',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.css'
})
export class ViewBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  sellerId: number | null = null;
  bookingsWithBuyers: any[] = []; // Temporary array to hold bookings with buyer details

  constructor(private bookingService: BookingService, private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.sellerId = this.authService.getSellerId();
    if (this.sellerId !== null) {
      this.loadBookingsWithBuyers(this.sellerId);
    } else {
      console.error('Seller ID is null, cannot load bookings');
    }
  }

  loadBookingsWithBuyers(sellerId: number): void {
    this.bookingService.getBookingsBySellerId(sellerId).subscribe(
      (bookings: Booking[]) => {
        bookings.forEach((booking: Booking) => {
          this.userService.getUserById(booking.buyerId).subscribe(
            (user: User) => {
              // Create a new object combining booking and user details
              const bookingWithBuyer = {
                booking: booking,
                buyer: user
              };
              this.bookingsWithBuyers.push(bookingWithBuyer); // Push combined object to temporary array
            },
            (error) => {
              console.error(`Error fetching buyer details for booking ID ${booking.id}`, error);
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }


  
}