// Importieren der benötigten Module und Komponenten
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from "../../DemoNgZorroAntdModule";
import { BookCarComponent } from './components/book-car/book-car.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { UserDashboradComponent } from "../../modules/customer/components/user-dashboard/user-dashborad.component";

// Deklaration des Moduls mit Metadaten
@NgModule({
  declarations: [
    BookCarComponent,
    MyBookingsComponent,
    UserDashboradComponent,
    SearchCarComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule
  ]
})
export class CustomerModule { }