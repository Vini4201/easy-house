import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AddPropertyComponent } from '../add-property/add-property.component';
import { ViewBookingsComponent } from '../view-bookings/view-bookings.component';
import { CommonModule } from '@angular/common';
import { Property } from '../models/property';
import { PropertyService } from '../services/property.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule, 
    AddPropertyComponent, ViewBookingsComponent],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit {

  showDeleteConfirmToast: boolean = false;
  deleteToast: { message: string, type: 'danger' | 'confirm' } = { message: '', type: 'danger' };
  properties: Property[] = [];

  constructor(private propertyService: PropertyService, private authService: AuthService,
    private router: Router, private toastService: ToastService) { }

    ngOnInit(): void {
      const sellerId = this.getSellerIdFromLocalStorage(); // Retrieve sellerId from wherever it's stored
      if (sellerId) {
          const sellerIdNumber = parseInt(sellerId, 10);
          if (!isNaN(sellerIdNumber)) {
              this.getPropertiesBySellerId(sellerIdNumber); // Parse sellerId to number
          } else {
              console.error("Invalid sellerId: ", sellerId);
          }
      }
  }


  private getSellerIdFromLocalStorage(): string | null {
    return localStorage.getItem('sellerId');
}

  private getProperties() {
    this.propertyService.getPropertiesList().subscribe({
      next: properties => {
        this.properties = properties;
        console.log(this.properties); // Debug log to check properties array
      },
      error: err => {
        console.error('Error fetching properties', err);
      }

    });
  }

  // logProperty(property: any): void {
  //   console.log(property);
  // }

  getPropertiesBySellerId(sellerId: number) {
    this.propertyService.getPropertiesBySellerId(sellerId).subscribe({
      next: properties => {
        this.properties = properties;
        this.sortPropertiesByStatus(); // apply sorting function
        console.log(this.properties); // Debug log to check properties array
      },
      error: err => {
        console.error('Error fetching properties by seller ID', err);
      }
    });
  }

  private sortPropertiesByStatus(): void {
    const statusOrder = ['PENDING', 'APPROVED', 'REJECTED', 'AVAILABLE', 'SOLD'];
    this.properties.sort((a, b) => {
      return statusOrder.indexOf(a.propertyStatus) - statusOrder.indexOf(b.propertyStatus);
    });
  }


  updateProperty(id: number){
    this.router.navigate(['/easyhouse/update-property', id]);
  }

  deleteProperty(id: number): void {
    this.toastService.confirm(
      'Are you sure you want to delete this property?',
      () => {
        const sellerId = this.getSellerIdFromLocalStorage();
        if (sellerId) {
          const sellerIdNumber = parseInt(sellerId, 10);
          if (!isNaN(sellerIdNumber)) {
            this.propertyService.deleteProperty(id).subscribe(
              () => {
                this.getPropertiesBySellerId(sellerIdNumber);
                this.toastService.showSuccess(`Property with ID ${id} has been deleted.`);
              },
              error => {
                console.error('Error deleting property', error);
                this.toastService.showDanger(`Failed to delete property with ID ${id}.`);
              }
            );
          } else {
            console.error("Invalid sellerId: ", sellerId);
          }
        } else {
          console.error("SellerId not found in localStorage");
        }
      }
    );
  }

  getStatusClass(status: string | undefined): string {
    if (!status) {
      return ''; // return a default class if status is undefined
    }
    switch (status) {
      case 'APPROVED':
        return 'approved';
      case 'PENDING':
        return 'pending';
      case 'REJECTED':
        return 'rejected';
      case 'AVAILABLE':
        return 'available';
      case 'SOLD':
        return 'sold';
      default:
        return '';
    }
  }

  filterPropertiesByStatus(status: string): Property[] {
    return this.properties.filter(property => property.propertyStatus === status);
  }

  // deleteProperty(id: number) {
  //   this.propertyService.deleteProperty(id).subscribe(data => {
  //     console.log(data);
  //     this.getProperties();
  //   })
  // }

  //-------------- LOGOUT RED BUTTON WORKING ----------------

  // logout() {
  //   this.authService.logout().subscribe({
  //     next: (response) => {
  //       console.log('Logout successful', response);
  //       localStorage.removeItem('sellerId'); // Clear sellerId from local storage
  //       this.router.navigate(['/easyhouse/login']); // Redirect to login page
  //     },
  //     error: (error) => {
  //       console.error('Logout error', error);
  //     }
  //   });
  // }

  // logout() {
  //   this.authService.logout().subscribe({
  //     next: (response) => {
  //       console.log('Logout successful', response);
  //       this.router.navigate(['/login']);
  //     },
  //     error: (error) => {
  //       console.error('Logout error', error);
  //     }
  //   });
  // }

}