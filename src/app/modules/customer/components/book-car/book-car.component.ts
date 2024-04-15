// Importieren der benötigten Module und Services
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { UserStorageService } from "../../../../auth/services/storage/user-storage.service"
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from "../../../customer/service/customer.service"

// Deklaration der Komponente mit Metadaten
@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.scss']
})
export class BookCarComponent implements OnInit {

  // Deklaration der Variablen und Initialisierung der Formular-Gruppe
  carId: any = this.activatedroute.snapshot.params['carId'];
  car: any
  validateForm!: FormGroup;
  processedImg: any
  dateFormat = 'yyyy-MM-dd';
  isSpinning = false;
  size: NzButtonSize = 'large';
  isVisible = false;

  // Konstruktor der Komponente, in dem die benötigten Services injiziert werden
  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private customerService: CustomerService,
    private activatedroute: ActivatedRoute,) { }

  // Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird
  ngOnInit(): void {
    // Initialisierung der Formular-Gruppe
    this.validateForm = this.fb.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
    });
    // Aufruf der Methode zum Abrufen der Autodaten
    this.getCarByCarId();
  }

  // Methode zum Abrufen der Autodaten
  getCarByCarId() {
    this.customerService.getCarByCarId(this.carId).subscribe((res) => {
      this.processedImg = 'data:image/jpeg;base64,' + res.carDto.returnedImg;
      this.car = res.carDto;
    })
  }

  // Methode, die aufgerufen wird, wenn das Auto gebucht wird
  bookCar(formData: any): void {
    this.isSpinning = true;
    const obj = {
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      userId: UserStorageService.getUserId()
    }
    // Aufruf des bookACar-Services mit der Autoid und den Formulardaten
    this.customerService.bookACar(this.carId, obj).subscribe((res) => {
      this.isSpinning = false;
      this.message.success(`Car Booked Successfully`, { nzDuration: 5000 });
      this.router.navigateByUrl('/customer/bookings');
    }, error => {
      this.message.error(`${error.error}`, { nzDuration: 5000 });
    });
  }
}