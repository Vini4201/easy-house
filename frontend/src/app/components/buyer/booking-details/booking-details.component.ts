import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerService } from '../buyer.service';
import { AuthService } from '../../../services/auth.service';
import { Property } from '../../../models/property';
import { User } from '../../../models/user.model';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {

  booking: Booking;
  buyer: User;
  property: Property;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private buyerService: BuyerService, private bookingService: BookingService,
    private authService: AuthService, private router: Router
  ){
    this.booking = {
      id: 0,
      orderId: '',
      buyerId: 0,
      property: {
        id: 0,
        sellerId: 0,
        propertyName: '',
        propertyType: '',
        propertyCost: 0,
        propertyArea: 0,
        propertyAddress: '',
        propertyDescription: '',
        propertyImageUrl: '',
        propertyStatus: '',
        propertyPostDate: new Date(),
      },
      sellerId: 0,
      propertyName: '',
      propertyCost: 0,
      paymentMethod: 'CASH',
      paymentStatus: 'PENDING',
      propertyBuyDate: new Date(),
    };
    this.buyer = new User();
    this.property = new Property();
  }
  
  // ngOnInit(): void {
  //   const loginResponse = this.authService.getLoginResponse();
  //   if(loginResponse && loginResponse['user Id'] && loginResponse['role'] === 'BUYER') {
  //     this.buyerId = loginResponse['user Id'];
  //     this.buyerIdChange.emit(this.buyerId);
  //     console.log(this.buyerId);
  //     this.loadBookings();
  //   } else {
  //     console.error('User Id not found in login response');
  //   }
  // }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bookingService.getBookingById(this.id).subscribe((data: any) => {
      console.log(data);
      this.booking = data;
      this.buyer = data.buyer;
      this.property = data.property;
    });
  }

  // loadBookings(): void {
  //   if(this.buyerId !== null) {
  //     this.buyerService.getBookingsByBuyerId(this.buyerId).subscribe(
  //       (bookings: Booking[]) => {
  //         this.bookings = bookings;
  //         console.log('Bookings:', this.bookings);
  //       },
  //       error => {
  //         console.error('Error fetching bookings:', error);
  //       }
  //     );
  //   }
  // }

  goToBookingList() {
    this.router.navigate(['easyhouse/admin-home/bookings']);
  }
  
}
