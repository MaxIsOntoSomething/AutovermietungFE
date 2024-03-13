// Import der benötigten Module
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Basis-URL für die HTTP-Anfragen
const BASE_URL = ["Http://localhost:8080"];

// Deklaration des AuthService als Injectable
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private htpp: HttpClient) { }

  // Methode zum Registrieren eines Benutzers
  register(signuprequest: any): Observable<any> {
    // Sendet eine POST-Anfrage an die angegebene URL mit den übergebenen Daten
    return this.htpp.post(BASE_URL + '/api/auth/signup', signuprequest);
  }

login (loginrequest:any):Observable<any>{
  return this.htpp.post(BASE_URL + '/api/auth/login', loginrequest);




}



  
}