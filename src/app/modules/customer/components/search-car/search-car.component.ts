import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { CustomerService } from "../../../customer/service/customer.service"

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit {

  listOfBrands = ["BMW", "AUDI", "FERRARI", "PORSCHE", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Benzin", "Hybrid", "Diesel", "Elektro", "Wasserstoff"];
  listOfColor = ["Rot", "Weiß", "Blau", "Schwarz", "Orange", "Grau", "Silber", "Gelb", "Grün"];
  listOfTransmission = ["Schaltgetriebe", "Automatik"];
  isSpinning = false;
  size: NzButtonSize = 'large';
  validateForm!: FormGroup;
  cars: any = [];

  constructor(private fb: FormBuilder,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],
    });
  }

  searchCar() {
    console.log(this.validateForm.value);
    this.isSpinning = true;
    this.customerService.searchCar(this.validateForm.value).subscribe((res) => {
      res.carDtoList.forEach((element :any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.cars.push(element);
      });
      console.log(res)
      this.isSpinning = false;
    })
  }

}
