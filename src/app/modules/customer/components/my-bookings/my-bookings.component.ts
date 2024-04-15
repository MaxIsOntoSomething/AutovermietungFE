// Importieren der benötigten Module und Services
import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { CustomerService } from "../../../customer/service/customer.service"

// Deklaration der Komponente mit Metadaten
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {

  // Deklaration der Variablen
  size: NzButtonSize = 'large';
  isSpinning!: boolean;
  bookedCars: any

  // Konstruktor der Komponente, in dem der benötigte Service injiziert wird
  constructor(private customerService: CustomerService) { }

  // Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird
  ngOnInit(): void {
    // Aufruf der Methode zum Abrufen der Buchungen
    this.getMyAllBookings();
  }

  // Methode zum Abrufen der Buchungen
  getMyAllBookings() {
    this.customerService.getBookedCarsByUserId().subscribe((res) => {
      // Speichern der abgerufenen Buchungen in der bookedCars-Variable
      this.bookedCars = res;
      console.log(res);
    })
  }
}