// Importieren der benötigten Module und Services
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from "../../../../environments/environment"
import { UserStorageService } from '../storage/user-storage.service';

// Basis-URL und Authentifizierungsheader aus der Umgebungsdatei
const BASIC_URL = environment['BASIC_URL'];
export const AUTH_HEADER = 'authorization';

// Deklaration des Services mit Metadaten
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Konstruktor des Services, in dem der HttpClient injiziert wird
  constructor(private http: HttpClient) { }

  // Methode für die Anmeldung eines Benutzers
  login(loginRequest: any): Observable<any> {
    console.log(loginRequest);
    // Sendet eine POST-Anfrage an die Login-API
    return this.http.post<[]>(BASIC_URL + "api/auth/login", loginRequest);
  }

  // Methode für die Registrierung eines Benutzers
  register(data: any): Observable<any> {
    console.log(data);
    // Sendet eine POST-Anfrage an die Registrierungs-API
    return this.http.post(BASIC_URL + "api/auth/signup", data);
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