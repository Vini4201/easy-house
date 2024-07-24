import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseURL = 'http://localhost:8080/easyhouse';

  constructor(private http: HttpClient) { }

  getBookingsBySellerId(sellerId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseURL}/bookings/seller/${sellerId}`);
  }


  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseURL}/bookings`);
  }

  getBookingsList(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseURL);
  }

  createBooking(booking: Booking): Observable<Object> {
    return this.http.post(`${this.baseURL}`, booking);
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseURL}/bookings/${id}`);
  }

  updateBooking(id: number, booking: Booking): Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getBookingsByBuyerId(buyerId: number): Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.baseURL}/api/buyer/${buyerId}/bookings`)
  }
}