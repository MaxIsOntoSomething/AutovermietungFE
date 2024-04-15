// Importieren der benötigten Module und Services
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from "../../../../environments/environment"
import { UserStorageService } from "../../../auth/services/storage/user-storage.service";

// Basis-URL aus der Umgebungsdatei
const BASIC_URL = environment['BASIC_URL'];

// Deklaration des Services mit Metadaten
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Konstruktor des Services, in dem der HttpClient injiziert wird
  constructor(private http: HttpClient,) { }

  // Methode zum Hinzufügen eines Autos
  addCar(carDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/admin/car", carDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Car posted successfully')),
        catchError(this.handleError<[]>('Error posting Car', []))
      );
  }

  // Methode zum Abrufen aller Autos
  getAllCars(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/cars`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Cars Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Cars', []))
      );
  }

  // Methode zum Abrufen eines Autos anhand der Auto-ID
  getCarByCarId(carId:any): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/car/${carId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Car Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Car', []))
      );
  }

  // Methode zum Aktualisieren eines Autos anhand der Auto-ID
  putCarByCarId(carId: any, carDto: any): Observable<any> {
    return this.http
      .put<[]>(BASIC_URL + `api/admin/car/${carId}`, carDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Car Updated successfully')),
        catchError(this.handleError<[]>('Error updating Car', []))
      );
  }

  // Methode zum Löschen eines Autos anhand der Auto-ID
  deleteCarByCarId(carId: any): Observable<any> {
    return this.http
      .delete<[]>(BASIC_URL + `api/admin/car/${carId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Car Deleted successfully')),
        catchError(this.handleError<[]>('Error Deleting Car', []))
      );
  }

  // Methode zum Suchen von Autos
  searchCar(searchCarDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/admin/car/search", searchCarDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Cars fetched successfully')),
        catchError(this.handleError<[]>('Error getting Cars', []))
      );
  }

  // Methode zum Abrufen aller Buchungen
  getBookings(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/car/bookings`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Booking Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Bookings', []))
      );
  }

  // Methode zum Ändern des Buchungsstatus
  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/car/booking/${bookingId}/${status}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Booking status changed successfully')),
        catchError(this.handleError<[]>('Error changing Booking status.', []))
      );
  }

  // Methode zum Erstellen des Authentifizierungsheaders
  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  // Hilfsmethode zum Loggen von Nachrichten
  log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  // Methode zum Behandeln von Fehlern in HTTP-Anfragen
  handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      // Loggt den Fehler und gibt eine Fehlermeldung aus
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // Lässt die App weiterlaufen, indem ein leeres Ergebnis zurückgegeben wird
      return of(result as T);
    };
  }
}