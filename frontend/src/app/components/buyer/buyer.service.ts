import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Property } from '../../models/property';
import { Booking } from '../../models/booking.model';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  private baseURL = 'http://localhost:8080/easyhouse';
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Booking Operations
  getBookingsByBuyerId(buyerId: number): Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.baseURL}/api/buyer/${buyerId}/bookings`)
  }

  //All Properties
  getAllProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(`${this.baseURL}/properties`);
  }

  //Single Property
  getPropertyById(buyerId: number,propertyId: number): Observable<Property> {
    return this.http.get<Property>(`${this.baseURL}/api/buyer/${buyerId}/properties/${propertyId}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching property by ID:', error);
          return throwError(error);
        })
      );
  }

  //Cart Operations
  getCartItemsByBuyerId(buyerId: number): Observable<any> {
    return this.http.get(`${this.baseURL}/api/buyer/${buyerId}/cart`).pipe(
      catchError(this.handleError)
    );
  }

  addToCart(buyerId: number, property: Property): Observable<any> {
    //Added params as backend code has requested params of buyer id and property id
    const params = new HttpParams()
      .set('buyerId', buyerId)
      .set('propertyId', property.id);
    return this.http.post<any>(`${this.baseURL}/api/add-to-cart`, {}, { params });
    // return this.http.post<any>(`${this.baseURL}/buyer/${buyerId}/cart/add-to-cart`, propertyId);
  }

  clearCart(buyerId: number): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/buyer/${buyerId}/clear-cart`,{});
  }


  purchaseProperties(buyerId: number, cartItemIds: number[], paymentMethod: string): Observable<Booking[]> {
    const url = `${this.baseURL}/api/buyer/${buyerId}/purchase`;
    const requestData = { cartItemIds, paymentMethod }; // Request data to log

    // Log request data before sending it to the server
    console.log('Request data:', requestData);

    return this.http.post<Booking[]>(url, requestData).pipe(
      tap(_ => console.log('Request sent:', requestData)), // Log the request data sent to the server
      catchError((error: any) => {
        console.error('Error in purchaseProperties:', error);
        throw error;
      })
    );
  }


  private handleError(error: any)
  {
      console.error('An error occurred: ', error);
      return throwError(error);
  }
}
