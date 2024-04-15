// Importieren der benötigten Module und Services
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

// Deklaration der Komponente mit Metadaten
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Deklaration der Autos-Liste
  cars: any = [];

  // Konstruktor der Komponente, in dem die benötigten Services injiziert werden
  constructor(private adminService: AdminService,
    private message: NzMessageService) { }

  // Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird
  ngOnInit(): void {
    // Aufruf der Methode zum Abrufen aller Autos
    this.getAllCars();
  }

  // Methode zum Abrufen aller Autos
  getAllCars() {
    this.cars = [];
    this.adminService.getAllCars().subscribe((res) => {
      // Verarbeitung der Antwort und Hinzufügen der Autos zur Autos-Liste
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
    });
  }

  // Methode zum Löschen eines Autos
  deleteCar(carId: any) {
    this.adminService.deleteCarByCarId(carId).subscribe((res) => {
      // Nach dem Löschen des Autos werden alle Autos erneut abgerufen
      this.getAllCars();
      // Anzeige einer Erfolgsmeldung
      this.message.success(`Car Deleted Successfully`, { nzDuration: 5000 });
    })
  }
}