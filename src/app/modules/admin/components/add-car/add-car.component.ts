import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {

  validateForm!: FormGroup;
  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;
  isSpinning = false;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService) { }

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
  }


  submitForm(): void {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    formData.append('img', new Blob()); // Füge ein leeres Blob-Objekt hinzu (anstelle von this.selectedFile)
    formData.append('brand', this.validateForm.get('brand')?.value);
    formData.append('name', this.validateForm.get('name')?.value);
    formData.append('type', this.validateForm.get('type')?.value);
    formData.append('color', this.validateForm.get('color')?.value);
    formData.append('year', this.validateForm.get('year')?.value);
    formData.append('transmission', this.validateForm.get('transmission')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);
    console.log(formData);
    this.adminService.addCar(formData).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.message
        .success(
          `Car Posted Successfully`,
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
  }

 previewImage() {
  if (this.selectedFile) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  } else {
    console.error('No file selected');
  }
 }
}
 



