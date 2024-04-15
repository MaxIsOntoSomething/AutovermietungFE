// Importieren des Injectable-Decorators aus dem Angular-Core-Modul
import { Injectable } from '@angular/core';

// Definition der Schlüssel, unter denen die Daten im lokalen Speicher gespeichert werden
const TOKEN = 'l_token';
const USER = 'l_user';

// Deklaration des Services mit Metadaten
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  // Konstruktor des Services
  constructor() { }

  // Methode zum Speichern des Tokens im lokalen Speicher
  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  // Methode zum Speichern des Benutzers im lokalen Speicher
  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  // Methode zur Überprüfung, ob ein Token im lokalen Speicher vorhanden ist
  static hasToken(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    return true;
  }

  // Methode zum Abrufen des Tokens aus dem lokalen Speicher
  static getToken(): string {
    return localStorage.getItem(TOKEN) as string;
  }

  // Methode zum Abrufen des Benutzers aus dem lokalen Speicher
  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER) as string);
  }

  // Methode zum Abrufen der Benutzer-ID aus dem lokalen Speicher
  static getUserId(): string {
    const user = this.getUser();
    if (user == null) { return ''; }
    return user.id;
  }

  // Methode zum Abrufen der Benutzerrolle aus dem lokalen Speicher
  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) { return ''; }
    return user.role;
  }

  // Methode zur Überprüfung, ob ein Admin eingeloggt ist
  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'ADMIN';
  }

  // Methode zur Überprüfung, ob ein Kunde eingeloggt ist
  static isCustomerLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CUSTOMER';
  }

  // Methode zum Ausloggen des Benutzers und Entfernen der Daten aus dem lokalen Speicher
  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}