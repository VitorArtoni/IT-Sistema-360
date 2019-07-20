import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { config } from '../config';
import { Aluno } from '../components/cadastro/model/aluno';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class CadastroService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('CadastroService');
     }

    cadastrarAluno(aluno: Aluno): Observable<Aluno> {
        return this.http.post<Aluno>(`${config.apiUrl}/aluno`,aluno)
            .pipe(
                catchError(this.handleError('cadastrarAluno',aluno))
            );
    }
}