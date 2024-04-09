import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit {

  carId: any = this.activatedroute.snapshot.params['carId'];
  imgChanged = false;
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;
  isSpinning = false;
  validateForm!: FormGroup;
  listOfBrands = ["BMW", "AUDI", "FERRARI", "PORSCHE", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Benzin", "Hybrid", "Diesel", "Elektro", "Wasserstoff"];
  listOfColor = ["Rot", "Weiß", "Blau", "Schwarz", "Orange", "Grau", "Silber", "Gelb", "Grün"];
  listOfTransmission = ["Schaltgetriebe", "Automatik"];
  listOfStatus = ["Verfügbar", "Gebucht"];


  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService,
    private activatedroute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      brand: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      color: [null, [Validators.required]],
      year: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
    this.getCarByCarId();
  }

  getCarByCarId() {
    this.adminService.getCarByCarId(this.carId).subscribe((res) => {
      console.log(res);
      const carDto = res.carDto;
      this.existingImage = 'data:image/jpeg;base64,' + res.carDto.returnedImg;
      this.validateForm.patchValue(carDto);
    })
  }

  submitForm(): void {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.imgChanged && this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    formData.append('brand', this.validateForm.get('brand')?.value);
    formData.append('name', this.validateForm.get('name')?.value);
    formData.append('type', this.validateForm.get('type')?.value);
    formData.append('color', this.validateForm.get('color')?.value);
    formData.append('year', this.validateForm.get('year')?.value);
    formData.append('transmission', this.validateForm.get('transmission')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);
    console.log(formData);
    this.adminService.putCarByCarId(this.carId, formData).subscribe((res) => {
      this.isSpinning = false;
      this.message
        .success(
          `Car updated Successfully`,
          { nzDuration: 5000 }
        );
      this.router.navigateByUrl('/admin/dashboard');
    }, error => {
      this.message
        .error(
          `${error.error}`,
          { nzDuration: 5000 }
        )
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
