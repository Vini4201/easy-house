import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../../../models/property';
import { BuyerService } from '../buyer.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponentbuyer implements OnInit {

  // property!: Property;
  // @Input() buyerId!: number;
  // @Input() propertyId!: number;
  // id: number = 0;
  property: Property = new Property();
  propertyId: number = 0;
  buyerId: number = 0;  // Add buyerId field

  constructor(
    private buyerService: BuyerService,
    private route: ActivatedRoute, private propertyService: PropertyService,private router: Router
  ){}
  // ngOnInit(): void {
  //   this.route.parent?.params.subscribe(params => {
  //     this.buyerId = +params['buyerId'];
  //     console.log(this.buyerId);
  //   });
  //   const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
  //   this.propertyId = +snapshot.params['propertyId'];
  //   this.loadPropertyDetails();
  // }

  // was giving error
  // ngOnInit(): void {
  //   this.id = this.route.snapshot.params['id'];
  //   this.propertyService.getPropertyById(this.id).subscribe(data => {
  //     this.property = data;
  //   }, error => console.log(error));
  // }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.propertyId = +params['propertyId']; // Ensure the propertyId is captured as a number
      this.buyerId = +params['buyerId'];  // Capture buyerId from the route params
      this.loadPropertyDetails();
    });
  }

  // private loadPropertyDetails(): void{
  //   console.log(this.buyerId, this.propertyId);
  //   this.buyerService.getPropertyById(this.buyerId, this.propertyId).subscribe(
  //     (data: Property) => {
  //       this.property = data;
  //       console.log("Property Details by Property Id",this.property);
  //     },
  //     error => {
  //       console.error("Error fetching property details:",error);
  //     }
  //   );
  // }

  private loadPropertyDetails(): void {
    this.propertyService.getPropertyById(this.propertyId).subscribe(
      data => {
        this.property = data;
      },
      error => {
        console.error('Error fetching property details:', error);
      }
    );
  }

  goToPropertyList() {
    this.router.navigate(['/easyhouse/buyer-home', this.buyerId, 'properties']);  // Use the captured buyerId
  }

}
