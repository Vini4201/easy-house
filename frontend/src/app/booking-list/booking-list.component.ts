import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../models/booking.model';
import { Property } from '../models/property';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.bookingService.getAllBookings().subscribe((data: any[]) => {
      this.bookings = data.map((item: any) => {
        return {
          id: item.id,
          orderId: item.orderId,
          buyerId: item.buyerId,
          property: item.property ? {
            id: item.property.id,
            sellerId: item.property.sellerId,
            propertyName: item.property.propertyName,
            propertyType: item.property.propertyType,
            propertyCost: item.property.propertyCost,
            propertyArea: item.property.propertyArea,
            propertyAddress: item.property.propertyAddress,
            propertyDescription: item.property.propertyDescription,
            propertyImageUrl: item.property.propertyImageUrl,
            propertyStatus: item.property.propertyStatus,
            propertyPostDate: item.property.propertyPostDate,
          } : null, // Use null if property is undefined
          propertyName: item.property?.propertyName ?? '',
          propertyCost: item.propertyCost,
          paymentMethod: item.paymentMethod,
          paymentStatus: item.paymentStatus,
          propertyBuyDate: item.propertyBuyDate
        } as Booking;
      });
    }, error => {
      console.error('Error fetching bookings:', error);
    });
  }

  viewBookingDetails(id: number) {
    this.router.navigate(['easyhouse/booking-details', id]);
  }

  // updateBooking(id: number) {
  //   this.router.navigate(['update-booking', id]);
  // }

  // deleteBooking(id: number) {
  //   this.bookingService.deleteBooking(id).subscribe(data => {
  //     console.log(data);
  //     this.getBookings();
  //   })
  // }
}
