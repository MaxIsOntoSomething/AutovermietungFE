// Importieren der benötigten Module und Komponenten
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './components/add-car/add-car.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { AdminGuard } from "../../auth/guards/authAdmin/admin.guard";

// Definition der Routen
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'add-car', component: AddCarComponent, canActivate: [AdminGuard] },
  { path: 'update-car/:carId', component: UpdateCarComponent, canActivate: [AdminGuard] },
  { path: 'search', component: SearchCarComponent, canActivate: [AdminGuard] },
  { path: 'bookings', component: GetBookingsComponent, canActivate: [AdminGuard] },
];

// Deklaration des Moduls mit Metadaten
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }