// Importieren der benötigten Module und Services
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { CustomerService } from "../../../customer/service/customer.service"

// Deklaration der Komponente mit Metadaten
@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit {

  // Deklaration der Variablen und Initialisierung der Formular-Gruppe
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
    private customerService: CustomerService) { }

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

  // Methode, die aufgerufen wird, wenn die Suche ausgeführt wird
  searchCar() {
    this.isSpinning = true;
    // Aufruf des searchCar-Services mit den Formulardaten
    this.customerService.searchCar(this.validateForm.value).subscribe((res) => {
      // Verarbeitung der zurückgegebenen Autos und Hinzufügen zur cars-Liste
      res.carDtoList.forEach((element :any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
      this.isSpinning = false;
    })
  }
}