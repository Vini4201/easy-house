import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';
import { User } from '../models/user.model';
import { Property } from '../models/property';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  booking: Booking;
  buyer: User;
  property: Property;
  id!: number;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bookingService.getBookingById(this.id).subscribe((data: any) => {
      console.log(data);
      this.booking = data;
      this.buyer = data.buyer;
      this.property = data.property;
    });
  }

  goToBookingList() {
    this.router.navigate(['easyhouse/admin-home/bookings']);
  }
}
