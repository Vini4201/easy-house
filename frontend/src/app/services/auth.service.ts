import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:8080/easyhouse';
  private sellerId!: number;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private loggedInUser: any;

  constructor(private http: HttpClient) {
    this.isLoggedInSubject.next(!!localStorage.getItem('id'));
  }

  //--------------------- WORKING LATEST BEFORE RED LOGOUT ----------------

  // login(email: string, userPassword: string): Observable<any> {
  //   const loginRequest = { email, userPassword };
  //   return this.http.post<any>(`${this.baseURL}/login`, loginRequest).pipe(
  //     tap(response => {
  //       this.sellerId = response.sellerId; // Assuming response contains sellerId
  //     })
  //   );
  // }

  //----------------------------- TO TRY -------------------

  // login(email: string, userPassword: string): Observable<any> {
  //   const loginRequest = { email, userPassword };
  //   return this.http.post<any>(`${this.baseURL}/login`, loginRequest).pipe(
  //     tap(response => {
  //       localStorage.setItem('id', response.id);
  //       localStorage.setItem('userRole', response.userRole);

  //       // Check the user role and set additional local storage items accordingly
  //       if (response.userRole === 'SELLER' && response.id) {
  //         localStorage.setItem('sellerId', response.sellerId);
  //         console.log('Seller logged in with id:', response.sellerId);
  //       } else if (response.userRole === 'BUYER' && response.id) {
  //         localStorage.setItem('buyerId', response.buyerId);
  //         console.log('Buyer logged in with id:', response.buyerId);
  //       } else if (response.userRole === 'ADMIN') {
  //         // For admin, we use the id directly as no separate adminId
  //         // Optionally, we can add a comment or log to indicate this is admin
  //         console.log('Admin logged in with id:', response.id);
  //       } else {
  //         // Handle the case where userRole is not recognized
  //         console.error('Unknown user role:', response.userRole);
  //       }

  //       this.isLoggedInSubject.next(true);
  //     })
  //   );
  // }

  login(email: string, userPassword: string): Observable<any> {
    const loginRequest = { email, userPassword };
    return this.http.post<any>(`${this.baseURL}/login`, loginRequest).pipe(
      tap(response => {
        localStorage.setItem('id', response.userId);
        localStorage.setItem('userRole', response.role);
        if (response.sellerId) {
          localStorage.setItem('sellerId', response.sellerId);
        }
        if (response.adminId) {
          localStorage.setItem('adminId', response.adminId);
        }
        this.isLoggedInSubject.next(true);
        this.setLoggedInUser(response); // Set the logged-in user
      })
    );
  }


  // check if email, username or phone number already exists or not
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/register`, user).pipe(
      catchError(error => {
        let errorMessage = 'Registration failed';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Use the error message from the backend
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  



  // working before email, username and phone number exists alert

  // register(user: User): Observable<User> {
  //   // Ensure all fields are present
  //   if (!user.firstName || !user.lastName || !user.userName || !user.phone ||
  //     !user.email || !user.userPassword || !user.confirmPassword ||
  //     !user.address || !user.userRole) {
  //     throw new Error('All fields are mandatory for registration');
  //   }
  //   return this.http.post<User>(`${this.baseURL}/register`, user);
  // }

  //------ WORKING -------

  // getSellerId(): number | null {
  //   return this.sellerId;
  // }

  getSellerId(): number | null {
    const sellerId = localStorage.getItem('sellerId');
    return sellerId ? parseInt(sellerId, 10) : null;
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/logout`, {}).pipe(
      tap(() => {
        this.clearLoggedInUser();
      })
    );
  }

  // Method to set the logged-in user after successful login
  private setLoggedInUser(response: any): void {
    const userId = response['userId'];

    localStorage.setItem('id', userId);
    localStorage.setItem('userRole', response.role);

    this.isLoggedInSubject.next(true);
    this.loggedInUser = {
      userId: userId,
      role: response.role
    };
  }

  // Method to get the logged-in user
  getLoggedInUser(): any {
    console.log(this.loggedInUser);
    return this.loggedInUser;
  }

  // Method to check if user is logged in
  isLoggedInUser(): boolean {
    return !!this.loggedInUser; // Returns true if loggedInUser is not null or undefined
  }

  getLoginResponse(): any {
    return this.loggedInUser; // Return the logged-in user data
  }

  getCurrentUserRole(): any {
    return this.loggedInUser ? this.loggedInUser.role : null;
  }

  private clearLoggedInUser(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('userRole');
    this.isLoggedInSubject.next(false);
    this.loggedInUser = null;
  }
  
}
