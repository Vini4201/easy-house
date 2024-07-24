import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, LoginComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      phone: ['', [Validators.required, this.phoneValidator()]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      userRole: ['', Validators.required],
      userPassword: ['', [Validators.required, this.passwordValidator()]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  // Custom validator for password complexity
  passwordValidator(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';

      // Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one symbol
      const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+={}\[\]:;<>,.?~\-]).{8,}$/;

      if (!passwordRegex.test(value)) {
        return { invalidPassword: true };
      }

      return null;
    };
  }

  // Custom validator for phone number
phoneValidator(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    // Phone number must be exactly 10 digits
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(value)) {
      return { invalidPhone: true };
    }

    return null;
  };
}

  passwordMatchValidator(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('userPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { ['passwordMismatch']: true };
  }


  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();  // Mark all fields as touched to show validation errors
      return;
    }
  
    const user = this.registerForm.value;
  
    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/easyhouse/login']);  // Redirect to login after successful registration
      },
      error: (error) => {
        console.error('Registration error', error);
        this.errorMessage = error.message;
        // Log the detailed error object received from backend
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
        console.log('Error details:', error.error);
  
        if (error.error && typeof error.error === 'string') {
          if (error.error.includes('Email is already taken')) {
            this.registerForm.get('email')?.setErrors({ customError: 'Email is already taken' });
          } else if (error.error.includes('Username is already taken')) {
            this.registerForm.get('username')?.setErrors({ customError: 'Username is already taken' });
          } else if (error.error.includes('Phone number is already taken')) {
            this.registerForm.get('phone')?.setErrors({ customError: 'Phone number is already taken' });
          }
        }
      }
    });
  }
  



  // register() {
  //   if (this.registerForm.invalid) {
  //     this.registerForm.markAllAsTouched();  // Mark all fields as touched to show validation errors
  //     return;
  //   }

  //   const user = this.registerForm.value;

  //   this.authService.register(user).subscribe({
  //     next: (response) => {
  //       console.log('Registration successful', response);
  //       this.router.navigate(['/easyhouse/login']);  // Redirect to login after successful registration
  //     },
  //     error: (error) => {
  //       this.errorMessage = error.message;
  //       console.error('Registration error', error);
  //     }
  //   });
  // }
  


}








// WORKING

// export class RegisterComponent {
//   user: User = new User();
//   errorMessage: string | undefined;

//   constructor(private authService: AuthService, private router: Router) { }

//   register() {
//     this.authService.register(this.user).subscribe({
//       next: (response) => {
//         console.log('Registration successful', response);
//         this.router.navigate(['/login']);  // Redirect to login after successful registration
//       },
//       error: (error) => {
//         this.errorMessage = 'Registration failed: ' + (error.message || 'Unknown error');
//         console.error('Registration error', error);
//       }
//     });
//   }
// }




//REDIRECTING
// export class RegisterComponent implements OnInit {
//   registerForm: FormGroup;
//   user: User = new User();

//   constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
//     this.registerForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       userName: ['', Validators.required],
//       phone: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       userPassword: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
//       address: ['', Validators.required],
//       userRole: ['BUYER', Validators.required] // Default role
//     });
//   }

//   ngOnInit(): void {}

//   saveUser() {
//     this.authService.register(this.registerForm.value).subscribe({
//       next: (response) => {
//         console.log(response);
//         alert('Successfully Registered');
//         this.goToLogin();
//       },
//       error: (error) => {
//         console.error(error);
//         alert('Error registering user');
//       },
//       complete: () => {
//         console.log('Registration request completed');
//       }
//     });
//   }

//   onSubmit() {
//     if (this.registerForm.valid) {
//       console.log(this.registerForm.value);
//       this.saveUser();
//       // this.router.navigate(['/login']);
//     } else {
//       // Display required field errors (if form is invalid)
//       this.markFormGroupTouched(this.registerForm);
//     }
//   }


//   markFormGroupTouched(formGroup: FormGroup) {
//     Object.values(formGroup.controls).forEach(control => {
//       control.markAsTouched();
//       if (control instanceof FormGroup) {
//         this.markFormGroupTouched(control);
//       }
//     });
//   }

//   goToLogin() {
//     this.router.navigate(['/login']);
//   }


// }


// LIKE ADD PROPERTY 
// export class RegisterComponent implements OnInit{

//   user: User = new User();

//   constructor (private authService: AuthService,
//     private router: Router) {}

//   ngOnInit(): void {
      
//   }

//   // saveProperty() {
//   //   this.propertyService.addProperty(this.property).subscribe( data =>{
//   //     console.log(data);
//   //   },
//   // error => console.log(error));
//   // }

//   saveUser() {
//     this.authService.register(this.user).subscribe({
//       next: (data) => {
//         console.log(data);
//         this.goToLogin();
//         // You can also add navigation or reset the form here
//       },
//       error: (error) => console.log(error)
//     });
//   }

//   goToLogin() {
//     this.router.navigate(['/login']);
//   }

//   onSubmit() {
//     console.log(this.user);
//     this.saveUser();
//   }

// }



// export class RegisterComponent {
//   registerForm: FormGroup;

//   constructor(private fb: FormBuilder, private authService: AuthService,
//     private router: Router
//   ) {
//     this.registerForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       userName: ['', Validators.required],
//       phone: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       userPassword: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
//       address: ['', Validators.required],
//       userRole: ['BUYER', Validators.required] // Default role
//     });
//   }

//   ngOnInit(): void {
      
//   }

//   onSubmit() {
//     if (this.registerForm.valid) {
//       this.authService.register(this.registerForm.value).subscribe({
//         next: response => {
//           console.log('User registered successfully', response);
//           // Redirect to login page after successful registration
//           // this.router.navigate(['/login']);
//           this.goToLogin();
//         },
//         error: error => {
//           console.error('Error registering user', error);
//         },
//         complete: () => {
//           console.log('Registration request completed');
//         }
//       });
//     }
//   }

//   goToLogin() {
//     this.router.navigate(['/login']);
//   }

// }

