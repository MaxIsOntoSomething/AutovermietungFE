// Importieren der benötigten Module und Services
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

// Deklaration der Komponente mit Metadaten
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Deklaration der Formular-Gruppe und des Lade-Indikators
  validateForm!: FormGroup;
  isSpinning = false;

  // Methode, die beim Absenden des Formulars aufgerufen wird
  submitForm(): void {
    // Starten des Lade-Indikators
    this.isSpinning = true;
    // Aufruf des Login-Services mit den Formulardaten
    this.authService.login(this.validateForm.value).subscribe(
      (res) => {
        // Überprüfung, ob die Anmeldung erfolgreich war
        if (res.userId != null) {
          // Speichern des Benutzers und des Tokens im Speicher
          UserStorageService.saveUser({ id: res.userId, role: res.userRole });
          UserStorageService.saveToken(res.jwt);
          // Weiterleitung des Benutzers zur entsprechenden Dashboard-Seite
          if (UserStorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
          } else if (UserStorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('customer/dashboard');
          }
        } else {
          // Anzeige einer Fehlermeldung, wenn die Anmeldung fehlgeschlagen ist
          this.message.error(`Bad credentials`, { nzDuration: 5000 });
        }
        // Beenden des Lade-Indikators
        this.isSpinning = false;
      })
  }

  // Konstruktor der Komponente, in dem die benötigten Services injiziert werden
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,) { }

  // Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird
  ngOnInit(): void {
    // Initialisierung der Formular-Gruppe
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

}