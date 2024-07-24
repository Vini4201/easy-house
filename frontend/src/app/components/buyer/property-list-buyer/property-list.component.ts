import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../../../models/property';
import { BuyerService } from '../buyer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PropertyDetailComponentbuyer } from '../property-detail-buyer/property-detail.component';
import { ToastService } from '../../../services/toast.service';
import { PropertyService } from '../../../services/property.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PropertyDetailComponentbuyer
  ],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponentbuyer implements OnInit {

  properties: Property[] = [];
  @Input() buyerId!: number;
  isAdminUser: boolean = false;

  constructor(
    private buyerService: BuyerService, private propertyService: PropertyService, 
    private route: ActivatedRoute, private toastService: ToastService, private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.buyerId = +params['buyerId'];
      this.checkAdminStatus();
      this.getAllProperties();
    });
  }

  private checkAdminStatus(): void {
    const loggedInUser = this.authService.getLoggedInUser();
    if (loggedInUser && loggedInUser.role === 'ADMIN') {
      this.isAdminUser = true;
    }
  }

  private getAllProperties(): void {
    this.buyerService.getAllProperties().subscribe({
      next: (data: Property[]) => {
        this.properties = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching properties', err);
      }
    });
  }

  addToCart(property: Property): void {
    this.buyerService.addToCart(this.buyerId, property).subscribe(
      response => {
        this.toastService.showSuccess("Property added to cart successfully!");
        console.log('Property added to cart:', response);
      },
      error => {
        if (error.status === 409) {
          this.toastService.showDanger("Property already exists in the cart");
          console.error('Property already exists in the cart');
        }
        // } else {
        //   this.toastService.showDanger("Error adding property to cart");
        //   console.error('Error adding property to cart:', error);
        // }
      }
    );
  }

  filterPropertiesByStatus(status: string): Property[] {
    return this.properties.filter(property => property.propertyStatus === status);
  }
}
