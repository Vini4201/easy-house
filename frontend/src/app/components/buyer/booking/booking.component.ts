import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { BuyerService } from '../buyer.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  bookings: any[] = [];
    @Input() buyerId!: number;

    constructor(
      private route: ActivatedRoute,
      private authService: AuthService,
      private bookingService: BookingService
    ){}


    ngOnInit(): void {
      this.route.parent?.params.subscribe(params => {
        this.buyerId = +params['buyerId'];
        console.log(this.buyerId);
        if (this.buyerId) {
          this.loadBookings();
        } else {
          console.error('Buyer Id not found in route parameters');
        }
      });
    }

    private loadBookings(): void{
      console.log(this.buyerId);

      this.bookingService.getBookingsByBuyerId(this.buyerId).subscribe(
        (data: any[]) => {
          this.bookings = data;
          console.log(this.bookings);
          error: (err: HttpErrorResponse) => {
            console.error("Error fetching bookings:",err);
          }
        });
    }
}
