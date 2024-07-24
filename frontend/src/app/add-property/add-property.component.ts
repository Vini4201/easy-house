import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Property } from '../models/property';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../services/property.service';
import { Route, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent implements OnInit {

  property: Property = new Property();
  sellerId: number | null = null; // Variable to hold the sellerId
  propertyForm!: FormGroup;
  errorMessage: string | null = null; // Variable to hold error messages
  selectedFile: File | null = null; // For upload image

  constructor(
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,
    private router: Router, private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initPropertyForm();
  }

  private initPropertyForm(): void {
    this.propertyForm = this.formBuilder.group({
      propertyName: ['', Validators.required],
      propertyType: ['', Validators.required],
      propertyCost: ['', Validators.required],
      propertyArea: ['', Validators.required],
      propertyAddress: ['', Validators.required],
      propertyDescription: [''],
      imageOption: ['', Validators.required], // New field for image option
      propertyImageUrl: [''],
      propertyImageFile: ['']   // for condition
      // propertyStatus: ['', Validators.required],
      // propertyPostDate: ['', Validators.required]
    });
  }

    // For upload file
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
}

// Handle image option change
onImageOptionChange() {
  this.propertyForm.get('propertyImageUrl')?.reset();
  this.propertyForm.get('propertyImageFile')?.reset();
  this.selectedFile = null;
}

  // For upload file
  uploadImageAndGetUrl() {
    return new Promise((resolve, reject) => {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append('imageFile', this.selectedFile);

            // Check the post URL correctly, it could be localhost:4200
            this.http.post('http://localhost:8080/easyhouse/properties/uploadImage', formData, { responseType: 'text' }).subscribe({
                next: (imageUrl) => resolve(imageUrl),
                error: (error) => reject(error)
            });
        } else {
            resolve(this.property.propertyImageUrl);
        }
    });
  }

  // saveProperty(): void {
  //   if (this.propertyForm.valid) {
  //     const propertyData: Property = {
  //       ...this.propertyForm.value,
  //       sellerId: this.getSellerIdFromLocalStorage(),
  //       propertyStatus: 'AVAILABLE', // Set default status
  //       propertyImageUrl: this.propertyForm.value.propertyImageUrl || 'https://img.freepik.com/free-psd/flat-design-house-illustration_23-2151299442.jpg' // Set default image URL if not provided
  //     };

  //     // Upload image and get URL, then save property
  //     this.uploadImageAndGetUrl().then((imageUrl: any) => {
  //       // for upload image
  //       propertyData.propertyImageUrl = imageUrl;
  //       this.propertyService.addProperty(propertyData).subscribe({
  //         next: (data) => {
  //           console.log('Property added successfully:', data);
  //           this.goToPropertyList();
  //         },
  //         error: (error) => {
  //           console.error('Error adding property:', error);
  //           if (error.status === 400 && error.error) {
  //             this.errorMessage = error.error; // Set error message from response
  //           } else {
  //             this.errorMessage = 'An unexpected error occurred';
  //           }
  //         }
  //       });
  //     }).catch(error => {
  //       console.error('Error uploading image:', error);
  //       this.errorMessage = 'An error occurred while uploading the image';
  //     });
  //   } else {
  //     console.error('Invalid form submission');
  //   }
  // }



  saveProperty(): void {
    if (this.propertyForm.valid) {
      const propertyData: Property = {
        ...this.propertyForm.value,
        sellerId: this.getSellerIdFromLocalStorage(),
        // for property approve
        propertyStatus: 'PENDING' // Set initial status to PENDING
        // propertyStatus: 'AVAILABLE' // Set default status
      };

      if (this.propertyForm.get('imageOption')?.value === 'upload') {
        // Upload image and get URL, then save property
        this.uploadImageAndGetUrl().then((imageUrl: any) => {
          // Use the uploaded image URL if available, otherwise use the default image URL
          propertyData.propertyImageUrl = imageUrl || 'https://img.freepik.com/free-psd/flat-design-house-illustration_23-2151299442.jpg';

          this.savePropertyData(propertyData);
        }).catch(error => {
          console.error('Error uploading image:', error);
          this.errorMessage = 'An error occurred while uploading the image';

          // Ensure the default image URL is used if image upload fails
          propertyData.propertyImageUrl = 'https://img.freepik.com/free-psd/flat-design-house-illustration_23-2151299442.jpg';

          this.savePropertyData(propertyData);
        });
      } else {
        this.savePropertyData(propertyData);
      }
    } else {
      console.error('Invalid form submission');
    }
  }

  savePropertyData(propertyData: Property): void {
    this.propertyService.addProperty(propertyData).subscribe({
      next: (data) => {
        console.log('Property added successfully:', data);
        this.goToPropertyList();
      },
      error: (error) => {
        console.error('Error adding property:', error);
        if (error.status === 400 && error.error) {
          this.errorMessage = error.error; // Set error message from response
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
      }
    });
  }


  // saveProperty(): void {
  //   if (this.propertyForm.valid) {
  //     const propertyData: Property = {
  //       ...this.propertyForm.value,
  //       sellerId: this.getSellerIdFromLocalStorage(),
  //       propertyStatus: 'AVAILABLE' // Set default status
  //     };
  
  //     // Upload image and get URL, then save property
  //     this.uploadImageAndGetUrl().then((imageUrl: any) => {
  //       // Use the uploaded image URL if available, otherwise use the default image URL
  //       propertyData.propertyImageUrl = imageUrl || 'https://img.freepik.com/free-psd/flat-design-house-illustration_23-2151299442.jpg';
  
  //       this.propertyService.addProperty(propertyData).subscribe({
  //         next: (data) => {
  //           console.log('Property added successfully:', data);
  //           this.goToPropertyList();
  //         },
  //         error: (error) => {
  //           console.error('Error adding property:', error);
  //           if (error.status === 400 && error.error) {
  //             this.errorMessage = error.error; // Set error message from response
  //           } else {
  //             this.errorMessage = 'An unexpected error occurred';
  //           }
  //         }
  //       });
  //     }).catch(error => {
  //       console.error('Error uploading image:', error);
  //       this.errorMessage = 'An error occurred while uploading the image';
  
  //       // Ensure the default image URL is used if image upload fails
  //       propertyData.propertyImageUrl = 'https://img.freepik.com/free-psd/flat-design-house-illustration_23-2151299442.jpg';
  
  //       this.propertyService.addProperty(propertyData).subscribe({
  //         next: (data) => {
  //           console.log('Property added successfully:', data);
  //           this.goToPropertyList();
  //         },
  //         error: (error) => {
  //           console.error('Error adding property:', error);
  //           if (error.status === 400 && error.error) {
  //             this.errorMessage = error.error; // Set error message from response
  //           } else {
  //             this.errorMessage = 'An unexpected error occurred';
  //           }
  //         }
  //       });
  //     });
  //   } else {
  //     console.error('Invalid form submission');
  //   }
  // }
  

  onSubmit(): void {
    this.saveProperty();
  }

  onReset(): void {
    this.propertyForm.reset(); // Reset the form fields
    this.selectedFile = null; // Clear the selected file
    this.errorMessage = null; // Clear any error messages
  }

  goToPropertyList(): void {
    this.router.navigate(['/easyhouse/seller-home/properties']);
    // this.router.navigate(['/easyhouse/properties']);
  }

  private getSellerIdFromLocalStorage(): number | null {
    const sellerId = localStorage.getItem('sellerId');
    return sellerId ? parseInt(sellerId, 10) : null;
  }


}




// ---------------------------- WORKING ----------------------------

// export class AddPropertyComponent implements OnInit{

//   property: Property = new Property();
//   sellerId: number | null = null; // Variable to hold the sellerId
//   propertyForm!: FormGroup;
//   errorMessage: string | null = null; // Variable to hold error messages

//   constructor(private propertyService: PropertyService, private formBuilder: FormBuilder,
//               private router: Router) {}

//   ngOnInit(): void {
//     this.sellerId = this.getSellerIdFromLocalStorage(); // Retrieve sellerId from local storage
//     // this.propertyForm = this.formBuilder.group({
//     //   propertyName: ['', Validators.required],
//     //   propertyType: ['', Validators.required],
//     //   propertyCost: ['', Validators.required],
//     //   propertyArea: ['', Validators.required],
//     //   propertyAddress: ['', Validators.required],
//     //   propertyDescription: ['', Validators.required],
//     //   propertyImageUrl: ['', Validators.required],
//     //   propertyStatus: ['', Validators.required],
//     //   propertyPostDate: ['', Validators.required],
//     // });
//   }

//   private getSellerIdFromLocalStorage(): number | null {
//     const sellerId = localStorage.getItem('sellerId');
//     return sellerId ? parseInt(sellerId, 10) : null;
//   }


//   saveProperty() {
//     if (this.sellerId) {
//       this.property.sellerId = this.sellerId; // Set the sellerId before sending the request
//       this.propertyService.addProperty(this.property).subscribe({
//         next: (data) => {
//           console.log(data);
//           this.goToPropertyList();
//         },
//         error: (error) => {
//           console.error(error);
//           if (error.error && error.error.message) {
//             this.errorMessage = error.error.message; // Set the error message from the response
//           } else {
//             this.errorMessage = 'An unexpected error occurred';
//           }
//         }
//       });
//     } else {
//       console.error('Seller ID is not available');
//       // Optionally, handle the error case where sellerId is not available
//     }
//   }

//   // ADD PROPERTY WITHOUT SELLER ID

//   // saveProperty() {
//   //   if (this.sellerId) {
//   //     this.property.sellerId = this.sellerId; // Set the sellerId before sending the request
//   //     this.propertyService.addProperty(this.property).subscribe({
//   //       next: (data) => {
//   //         console.log(data);
//   //         this.goToPropertyList();
//   //       },
//   //       error: (error) => console.log(error)
//   //     });
//   //   } else {
//   //     console.error('Seller ID is not available');
//   //     // Optionally, handle the error case where sellerId is not available
//   //   }
//   // }

//   goToPropertyList() {
//     this.router.navigate(['/properties']);
//   }

//   onSubmit() {
//     console.log(this.property);
//     this.saveProperty();
//   }

// }







// export class AddPropertyComponent implements OnInit{

//   property: Property = new Property();

//   constructor (private propertyService: PropertyService,
//     private router: Router) {}

//   ngOnInit(): void {
      
//   }

//   // saveProperty() {
//   //   this.propertyService.addProperty(this.property).subscribe( data =>{
//   //     console.log(data);
//   //   },
//   // error => console.log(error));
//   // }

//   saveProperty() {
//     this.propertyService.addProperty(this.property).subscribe({
//       next: (data) => {
//         console.log(data);
//         this.goToPropertyList();
//         // You can also add navigation or reset the form here
//       },
//       error: (error) => console.log(error)
//     });
//   }

//   goToPropertyList() {
//     this.router.navigate(['/properties']);
//   }

//   onSubmit() {
//     console.log(this.property);
//     this.saveProperty();
//   }

// }
