import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerGuard } from "../../auth/guards/authCustomer/customer.guard";
import { BookCarComponent } from './components/book-car/book-car.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { UserDashboradComponent } from "../../modules/customer/components/user-dashboard/user-dashborad.component";

const routes: Routes = [
  { path: 'dashboard', component: UserDashboradComponent, canActivate: [CustomerGuard] },
  { path: 'book/:carId', component: BookCarComponent, canActivate: [CustomerGuard] },
  { path: 'bookings', component: MyBookingsComponent, canActivate: [CustomerGuard] },
  { path: 'search', component: SearchCarComponent, canActivate: [CustomerGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
