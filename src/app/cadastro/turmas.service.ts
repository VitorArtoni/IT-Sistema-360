import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {
  
  constructor(private http: HttpClient) { }

  getTurmas(){
    return this.http.get<any>('/api/turmas');
  }
}
