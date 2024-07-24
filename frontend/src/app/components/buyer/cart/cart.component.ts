import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../../../models/cart.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Property } from '../../../models/property';
import { Booking } from '../../../models/booking.model';
import { ToastService } from '../../../services/toast.service';
import { FormsModule } from '@angular/forms';
import { BuyerService } from '../buyer.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  @Input() cartItems: Cart[] = [];
  @Input() selectedItems: Property[] = [];
  @Input() buyerId!: number;
  @Input() selectedPaymentMethod: string = '';
  bookings: Booking[] = [];

  constructor(
    private buyerService: BuyerService,
    private route: ActivatedRoute, private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.buyerId = +params['buyerId'];
      console.log(this.buyerId);
      if (this.buyerId) {
        this.loadCartItems();
      } else {
        console.error("Buyer Id not found in route parameters");
      }
    });
  }

  private loadCartItems(): void {
    this.buyerService.getCartItemsByBuyerId(this.buyerId).subscribe(
      (data: Cart[]) => {
        this.cartItems = data;
        console.log("Cart Items of the Buyer", this.cartItems);
      },
      (err: HttpErrorResponse) => {
        console.error("Error fetching cart items:", err);
      }
    );
  }

  selectItem(item: Property): void {
    if (!this.selectedItems.includes(item)) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
  }

  getTotalCost(): number {
    return this.selectedItems.reduce((total, item) => total + (item.propertyCost || 0), 0);
  }

  purchaseProperties(): void {
    const cartItemIds = this.selectedItems.map(selectedItem => {
      const cartItem = this.cartItems.find(cartItem => cartItem.property.id === selectedItem.id);
      return cartItem ? cartItem.id : null;
    }).filter(id => id !== null) as number[];

    console.log('Cart Item IDs:', cartItemIds, this.selectedItems);
    console.log('Selected Payment Method:', this.selectedPaymentMethod);

    if (cartItemIds.length > 0 && this.selectedPaymentMethod) {
      this.buyerService.purchaseProperties(this.buyerId, cartItemIds, this.selectedPaymentMethod).subscribe(
        (data: Booking[]) => {
          console.log(data);
          if (data && data.length > 0) {
            console.log("Property purchased successfully!", data);
            this.bookings = data;
            this.selectedItems = [];
            this.loadCartItems();
            console.log("Purchase successful", data);
          } else {
            console.error("No properties were purchased");
          }
        },
        (err: HttpErrorResponse) => {
          console.error("Error purchasing properties:", err);
        }
      );
    } else {
      if (cartItemIds.length === 0)
        console.error("No items selected for purchase");

      if (!this.selectedPaymentMethod)
        console.error("No payment method was selected")
    }
  }
}
