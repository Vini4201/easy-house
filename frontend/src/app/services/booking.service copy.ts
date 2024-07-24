import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseURL = "http://localhost:8000/bookings";

  constructor(private httpClient: HttpClient) { }

  getAllBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${this.baseURL}`);
  }

  getBookingsList(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.baseURL);
  }

  createBooking(booking: Booking): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, booking);
  }

  getBookingById(id: number): Observable<Booking> {
    return this.httpClient.get<Booking>(`${this.baseURL}/${id}`);
  }

  updateBooking(id: number, booking: Booking): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
