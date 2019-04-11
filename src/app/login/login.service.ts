import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(){
    return this.http.post('/api/login/aluno', {'ra': 'Teste', 'password':'123'})
  }
}
