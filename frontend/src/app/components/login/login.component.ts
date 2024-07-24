import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, RegisterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();  // Mark all fields as touched to show validation errors
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (response: any) => {
        console.log('Login response:', response); // Debugging line
        const userRole = response.role;
        if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN' ) {
          this.router.navigate(['/easyhouse/admin-home/users']);
        } else if (userRole === 'SELLER') {
          if (response.sellerId) {
            localStorage.setItem('sellerId', response.sellerId); // Store seller ID in local storage
            this.router.navigate(['/easyhouse/seller-home/properties']);
          } else {
            console.error('Seller ID is missing in the response');
          }
        } else if (userRole === 'BUYER') {
          localStorage.setItem('buyerId', response.buyerId); 
          this.router.navigate([`/easyhouse/buyer-home/${response.buyerId}`]);
        }
      },
      error => {
        this.errorMessage = error.error.message;
        console.error('Login error:', error); // Debugging line
      }
    );
  }
}
