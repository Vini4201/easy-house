import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { UpdatePropertyComponent } from './update-property/update-property.component';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { PropertyListComponentt } from './property-list-admin/property-list.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { BookingDetailsComponent } from './booking-details-admin/booking-details.component';
import { BuyerHomeComponent } from './components/buyer/buyer-home.component';
import { PropertyDetailComponentbuyer } from './components/buyer/property-detail-buyer/property-detail.component';
import { PropertyListComponentbuyer } from './components/buyer/property-list-buyer/property-list.component';
import { CartComponent } from './components/buyer/cart/cart.component';
import { BookingComponent } from './components/buyer/booking/booking.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { HomePageComponent } from './home-page/home-page.component';


export const routes: Routes = [
    { path: 'easyhouse/login', component: LoginComponent },
    { path: 'easyhouse/register', component: RegisterComponent },
    {
        path: 'easyhouse/seller-home', component: SellerHomeComponent, children: [
          { path: 'properties', component: PropertyListComponent },
          { path: 'add-property', component: AddPropertyComponent },
          { path: 'view-bookings', component: ViewBookingsComponent },
        ]
      },
    // { path: 'easyhouse/properties', component: PropertyListComponent },
    // { path: 'easyhouse/properties/add-property', component: AddPropertyComponent},
    // { path: 'easyhouse/properties/view-bookings', component: ViewBookingsComponent },
    // Default Route
    { path: '', redirectTo: 'easyhouse/login', pathMatch: 'full' },
    { path: 'easyhouse/update-property/:id', component: UpdatePropertyComponent},
    { path: 'easyhouse/home', component: HomePageComponent },
    { path: 'easyhouse/admin-home', component: AdminHomeComponent, children: [
        { path: 'users', component: UserListComponent },
        { path: 'create-user', component: CreateUserComponent },
        { path: 'create-admin', component: CreateAdminComponent },
        { path: 'bookings', component: BookingListComponent },
        { path: 'properties', component: PropertyListComponentt },
    ]},
 
    { path: 'easyhouse/update-user/:id', component: UpdateUserComponent },
    { path: 'easyhouse/user-details/:id', component: UserDetailsComponent },
    { path: 'easyhouse/property-details/:id', component: PropertyDetailsComponent },
    { path: 'easyhouse/booking-details/:id', component:  BookingDetailsComponent},
    {
        path: `easyhouse/buyer-home/:buyerId`,
        component: BuyerHomeComponent,
        children: [
            {
                path: '',
                redirectTo: 'properties',
                pathMatch: 'full'
            },
            {
                path: 'properties',
                component: PropertyListComponentbuyer
            },
            {
                path: 'properties/:propertyId',
                component: PropertyDetailComponentbuyer
            },
            {
                path: 'cart',
                component: CartComponent
            },
            {
                path: 'bookings',
                component: BookingComponent
            },
            {
                path: 'bookings/:bookingId',
                component: BookingDetailsComponent
            },
        ]
      }
   
];

