// Importieren der benötigten Module und Services
import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../../../customer/service/customer.service"

// Deklaration der Komponente mit Metadaten
@Component({
  selector: 'app-user-dashborad',
  templateUrl: './user-dashborad.component.html',
  styleUrls: ['./user-dashborad.component.scss']
})
export class UserDashboradComponent implements OnInit {

  // Deklaration der Variablen
  cars: any = [];

  // Konstruktor der Komponente, in dem der benötigte Service injiziert wird
  constructor(private customerService: CustomerService) { }

  // Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird
  ngOnInit(): void {
    // Aufruf der Methode zum Abrufen aller Autos
    this.getAllCars();
  }

  // Methode zum Abrufen aller Autos
  getAllCars() {
    this.customerService.getAllCars().subscribe((res) => {
      // Verarbeitung der zurückgegebenen Autos und Hinzufügen zur cars-Liste
      res.forEach((element :any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
      console.log(res);
    });
  }
}