import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginState = false;

  constructor(private http: HttpClient) { }

  setLoginState(value: boolean){
    this.loginState = value;
  }

  get isLoggedIn(){
    return this.isLoggedIn;
  }

  loginAluno(ra,senha){
    return this.http.post<myData>('/api/login/aluno', {
      ra,senha
    })
  }
}
