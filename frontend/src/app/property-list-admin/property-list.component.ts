import { Component, OnInit } from '@angular/core';
import { Property } from '../models/property';
import { PropertyService } from '../services/property.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';
import { BuyerService } from '../components/buyer/buyer.service';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponentt implements OnInit {
  properties: Property[] = [];

  constructor(private propertyService: PropertyService, private router: Router,
    private buyerService: BuyerService
  ) { }

  ngOnInit(): void {
    this.getProperties();
  }

  private getProperties() {
    this.propertyService.getPropertiesList().subscribe(data => {
      this.properties = data;
      this.sortPropertiesByStatus(); // apply sorting funtion
    });
  }

  private sortPropertiesByStatus(): void {
    const statusOrder = ['PENDING', 'APPROVED', 'REJECTED', 'AVAILABLE', 'SOLD'];
    this.properties.sort((a, b) => {
      return statusOrder.indexOf(a.propertyStatus) - statusOrder.indexOf(b.propertyStatus);
    });
  }

  approveProperty(id: number): void {
    this.propertyService.approveProperty(id).subscribe(() => {
      this.getProperties();
    });
  }

  rejectProperty(id: number): void {
    this.propertyService.rejectProperty(id).subscribe(() => {
      this.getProperties();
    });
  }

  propertyDetails(id:number){
    this.router.navigate(['/easyhouse/property-details',id]);
  }

  // updateProperty(id:number){
  //    this.router.navigate(['/easyhouse/admin-home/update-property',id]);
  // }

  deleteProperty(id:number){
    this.propertyService.deleteProperty(id).subscribe(data=>{
      console.log(data);
      this.getProperties();
    })
  }

  filterPropertiesByStatus(status: string): Property[] {
    return this.properties.filter(property => property.propertyStatus === status);
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

  
}
