// Importieren der benötigten Module und Services
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

// Deklaration der Komponente mit Metadaten
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // Deklaration der Formular-Gruppe und des Lade-Indikators
  validateForm!: FormGroup;
  isSpinning = false;

  // Konstruktor der Komponente, in dem die benötigten Services injiziert werden
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router) { }

  // Validator-Funktion zur Überprüfung der Passwortbestätigung
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird
  ngOnInit(): void {
    // Initialisierung der Formular-Gruppe
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
    });
  }

  // Methode, die beim Absenden des Formulars aufgerufen wird
  submitForm(): void {
    // Starten des Lade-Indikators
    this.isSpinning = true;
    // Aufruf des Registrierungs-Services mit den Formulardaten
    this.authService.register(this.validateForm.value).subscribe((res) => {
      // Beenden des Lade-Indikators
      this.isSpinning = false;
      // Überprüfung, ob die Registrierung erfolgreich war
      if (res.id != null) {
        // Anzeige einer Erfolgsmeldung und Weiterleitung zur Login-Seite
        this.message.success(`Signup successful`, { nzDuration: 5000 });
        this.router.navigateByUrl('/login');
      } else {
        // Anzeige einer Fehlermeldung, wenn die Registrierung fehlgeschlagen ist
        this.message.error(`${res.message}`, { nzDuration: 5000 });
      }
    })
  }

}