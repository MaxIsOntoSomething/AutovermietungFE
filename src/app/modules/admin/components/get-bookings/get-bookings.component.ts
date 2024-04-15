// Importieren der benötigten Module und Services
import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../admin-services/admin.service"
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

// Deklaration der Komponente mit Metadaten
@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.scss']
})
export class GetBookingsComponent implements OnInit {

  // Deklaration der Button-Größe, des Lade-Indikators und der Buchungen-Liste
  size: NzButtonSize = 'large';
  isSpinning!: boolean;
  bookings: any

  // Konstruktor der Komponente, in dem die benötigten Services injiziert werden
  constructor(private message: NzMessageService,
    private adminService: AdminService) { }

  // Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird
  ngOnInit(): void {
    // Aufruf der Methode zum Abrufen aller Buchungen
    this.getBookings();
  }

  // Methode zum Abrufen aller Buchungen
  getBookings() {
    this.adminService.getBookings().subscribe((res) => {
      // Speichern der Buchungen in der Buchungen-Liste
      this.bookings = res;
    })
  }

  // Methode zum Ändern des Buchungsstatus
  changeBookingStatus(bookingId: number, status: string) {
    // Starten des Lade-Indikators
    this.isSpinning = true;
    // Aufruf des changeBookingStatus-Services mit der Buchungs-ID und dem neuen Status
    this.adminService.changeBookingStatus(bookingId, status).subscribe((res) => {
      // Beenden des Lade-Indikators und erneutes Abrufen aller Buchungen
      this.isSpinning = false;
      this.getBookings();
      // Anzeige einer Erfolgsmeldung
      this.message.success(`Booking status changed successfully.`, { nzDuration: 5000 });
    }, error => {
      // Anzeige einer Fehlermeldung, wenn das Ändern des Buchungsstatus fehlgeschlagen ist
      this.message.error(`${error.error}`, { nzDuration: 5000 });
    })
  }
}