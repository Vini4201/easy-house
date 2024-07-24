import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../models/property';
import { FormsModule, NgForm } from '@angular/forms';
import { PropertyService } from '../services/property.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PropertyListComponent } from '../property-list/property-list.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-property',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-property.component.html',
  styleUrl: './update-property.component.css'
})
export class UpdatePropertyComponent implements OnInit{
  id!: number;
  property: Property = new Property();
  originalProperty: Property = new Property();
  useImageUrl: boolean = true; // Flag to determine image input method
  selectedFile: File | null = null; // For file upload

  //activated route used to get id from route
  constructor (private propertyService: PropertyService,
    private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.propertyService.getPropertyById(this.id)
          .subscribe({
            next: (data) => {
              console.log(data);
              this.property = data;
              this.originalProperty = { ...data }; // store the original property details
              // Determine input method based on the current property image URL
              this.useImageUrl = !!this.property.propertyImageUrl;
            },
            error: (error) => console.log(error)
          })
    }


    onImageChoiceChange(choice: string): void {
      this.useImageUrl = choice === 'url';
      if (!this.useImageUrl) {
        this.property.propertyImageUrl = ''; // Clear the URL if switching to file upload
      } else {
        this.selectedFile = null; // Clear the file if switching to URL input
      }
    }

    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }

    uploadImageAndGetUrl(): Promise<string> {
      return new Promise((resolve, reject) => {
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('imageFile', this.selectedFile);
  
          this.http.post('http://localhost:8080/easyhouse/properties/uploadImage', formData, { responseType: 'text' }).subscribe({
            next: (imageUrl) => resolve(imageUrl),
            error: (error) => reject(error)
          });
        } else {
          resolve(this.property.propertyImageUrl || ''); // Ensure a default empty string if URL is undefined
        }
      });
    }

    updateProperty(form: NgForm): void {
      if (form.invalid) {
        form.control.markAllAsTouched();
        return;
      }
      if (this.useImageUrl || this.selectedFile) {
        this.uploadImageAndGetUrl().then((imageUrl: string) => {
          this.property.propertyImageUrl = imageUrl;
  
          this.propertyService.updateProperty(this.id, this.property).subscribe({
            next: (data) => {
              console.log(data);
              this.property = new Property();
              this.goToPropertyList();
            },
            error: (error) => console.log(error)
          });
        }).catch(error => {
          console.error('Error uploading image:', error);
        });
      } else {
        this.propertyService.updateProperty(this.id, this.property).subscribe({
          next: (data) => {
            console.log(data);
            this.property = new Property();
            this.goToPropertyList();
          },
          error: (error) => console.log(error)
        });
      }
    }
  

    // updateProperty() {
    //   this.propertyService.updateProperty(this.id, this.property)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(data);
    //         this.property = new Property();
    //         //this.gotoList();
    //       },
    //       error: (error) => console.log(error)
    //     });
    // }
    

  onSubmit() {
    this.propertyService.updateProperty(this.id, this.property)
    .subscribe({
      next: (data) => {
        this.goToPropertyList();
      }, error: (error) => console.log(error)
    })
  }

  onReset() {
    // Reset the form to its original state
    this.property = { ...this.originalProperty };
  }

  goToPropertyList() {
    this.router.navigate(['/easyhouse/seller-home/properties']);
  }

}
