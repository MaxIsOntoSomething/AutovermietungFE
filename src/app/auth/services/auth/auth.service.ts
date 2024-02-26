import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = ["Http://localhost:8080"];
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private htpp: HttpClient) { }

  register(signuprequest: any) {
    return this.htpp.post(BASE_URL + '/api/auth/signup', signuprequest);
  }



  
}