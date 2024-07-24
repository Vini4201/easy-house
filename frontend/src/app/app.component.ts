import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ToastComponent } from './toast/toast.component';
import { BuyerHomeComponent } from './components/buyer/buyer-home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ToastService } from './services/toast.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    BuyerHomeComponent,
    SellerHomeComponent,
    AdminHomeComponent,
    HomePageComponent,
    NavbarComponent,
    FooterComponent,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ToastService]
})
export class AppComponent {
  title = 'easyhouse-frontend';
}
