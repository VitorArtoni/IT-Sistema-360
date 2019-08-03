import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { Globals } from '../app.globals';
import { config } from '../config';
import { preAluno, posAluno } from '../components/cadastro/model/aluno';

@Injectable({
    providedIn: 'root'
})
export class AlunosService {

    constructor(private http: HttpClient, private globals: Globals) { }

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