// Importieren der benötigten Module und Services
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

// Deklaration der Komponente mit Metadaten
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {

  // Deklaration der Formular-Gruppe, des ausgewählten Bildes, des Bildvorschau-Strings und des Lade-Indikators
  validateForm!: FormGroup;
  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;
  isSpinning = false;

  // Listen für die Dropdown-Optionen
  listOfBrands = ["BMW", "AUDI", "FERRARI", "PORSCHE", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Benzin", "Hybrid", "Diesel", "Elektro", "Wasserstoff"];
  listOfColor = ["Rot", "Weiß", "Blau", "Schwarz", "Orange", "Grau", "Silber", "Gelb", "Grün"];
  listOfTransmission = ["Schaltgetriebe", "Automatik"];

  // Konstruktor der Komponente, in dem die benötigten Services injiziert werden
  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService) { }

  // Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird
  ngOnInit(): void {
    // Initialisierung der Formular-Gruppe
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

  // Methode, die beim Absenden des Formulars aufgerufen wird
  submitForm(): void {
    // Starten des Lade-Indikators
    this.isSpinning = true;
    // Erstellen eines FormData-Objekts und Hinzufügen der Formulardaten
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
    // Aufruf des addCar-Services mit den Formulardaten
    this.adminService.addCar(formData).subscribe((res) => {
      // Beenden des Lade-Indikators
      this.isSpinning = false;
      // Anzeige einer Erfolgsmeldung und Weiterleitung zur Dashboard-Seite
      this.message.success(`Car Posted Successfully`, { nzDuration: 5000 });
      this.router.navigateByUrl('/admin/dashboard');
    }, error => {
      // Anzeige einer Fehlermeldung, wenn das Hinzufügen des Autos fehlgeschlagen ist
      this.message.error(`${error.error}`, { nzDuration: 5000 });
    });
  }

  // Methode, die aufgerufen wird, wenn eine Datei ausgewählt wird
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  // Methode zum Erstellen einer Vorschau des ausgewählten Bildes
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