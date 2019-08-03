import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { config } from '../config';
import { preAluno, posAluno } from '../components/cadastro/model/aluno';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class AlunosService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('CadastroService');
     }

    cadastrarSenhaAluno(aluno: posAluno): Observable<boolean> {
        return this.http.post<posAluno>(`${config.apiUrl}/aluno/pos`,aluno)
            .pipe(
                mapTo(true),
                catchError(error => {
                    console.log(error.error);
                    alert(error.error.response);
                    return of(false);
                })
            );
    }

    cadastrarAluno(aluno: preAluno): Observable<boolean> {
        return this.http.post<preAluno>(`${config.apiUrl}/aluno/pre`,aluno)
            .pipe(
                mapTo(true),
                catchError(error => {
                    console.log(error.error);
                    alert(error.error.response);
                    return of(false);
                })
            );
    }
}