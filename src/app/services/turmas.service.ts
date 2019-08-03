import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) { 
    this.handleError = httpErrorHandler.createHandleError('TurmasService');
  }

  getTurmas(){
    return this.http.get<any>('/turmas');
  }

  cadastrarTurma(turma: { idTurma: string, disciplina: string, semestre: string, ano: string}): Observable<boolean> {
    return this.http.post<any>('/turmas', turma)
      .pipe(
        catchError(this.handleError('cadastrarTurma',turma))
      );
  }
}
