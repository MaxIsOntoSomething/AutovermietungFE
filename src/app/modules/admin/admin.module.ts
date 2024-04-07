import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCarComponent } from './components/add-car/add-car.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';


@NgModule({
  declarations: [
    DashboardComponent,
    AddCarComponent,
    UpdateCarComponent,
    SearchCarComponent,
    GetBookingsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
