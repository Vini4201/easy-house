import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  id: number = 0;
  property: Property = new Property();

  constructor(private route: ActivatedRoute, private propertyService: PropertyService,private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.propertyService.getPropertyById(this.id).subscribe(data => {
      this.property = data;
    }, error => console.log(error));
  }

  goToPropertyList() {
    this.router.navigate(['/easyhouse/admin-home/properties']);
  }
}
