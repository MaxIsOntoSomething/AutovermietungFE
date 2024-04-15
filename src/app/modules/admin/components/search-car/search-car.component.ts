// Importieren der benötigten Module und Services
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../admin-services/admin.service';

// Deklaration der Komponente mit Metadaten
@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit {

  // Listen für die Dropdown-Optionen und Deklaration der Button-Größe, des Lade-Indikators, der Formular-Gruppe und der Autos-Liste
  listOfBrands = ["BMW", "AUDI", "FERRARI", "PORSCHE", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Benzin", "Hybrid", "Diesel", "Elektro", "Wasserstoff"];
  listOfColor = ["Rot", "Weiß", "Blau", "Schwarz", "Orange", "Grau", "Silber", "Gelb", "Grün"];
  listOfTransmission = ["Schaltgetriebe", "Automatik"];
  isSpinning = false;
  size: NzButtonSize = 'large';
  validateForm!: FormGroup;
  cars: any = [];

  // Konstruktor der Komponente, in dem die benötigten Services injiziert werden
  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private adminService: AdminService) { }

  // Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird
  ngOnInit(): void {
    // Initialisierung der Formular-Gruppe
    this.validateForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],
    });
  }

  // Methode, die aufgerufen wird, wenn die Suche gestartet wird
  searchCar() {
    // Starten des Lade-Indikators
    this.isSpinning = true;
    // Aufruf des searchCar-Services mit den Formulardaten
    this.adminService.searchCar(this.validateForm.value).subscribe((res) => {
      // Verarbeitung der Antwort und Hinzufügen der Autos zur Autos-Liste
      res.carDtoList.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
      // Beenden des Lade-Indikators
      this.isSpinning = false;
    })
  }
}