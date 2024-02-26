import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ["Http://localhost:8080"];
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private htpp: HttpClient) { }

  register(signuprequest: any):Observable<any> {
    return this.htpp.post(BASE_URL + '/api/auth/signup', signuprequest);
  }




}