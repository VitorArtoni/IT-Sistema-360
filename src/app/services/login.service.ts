import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs-compat/Subject';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private httpClient: HttpClient) { }

    private loginSource = new Subject<any>();
    login$ = this.loginSource.asObservable();

    getLoginPermission(){
        return this.httpClient.get('/')
    }
}