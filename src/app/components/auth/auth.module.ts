import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from '../../services/auth.service';
import { HomeGuard } from './guards/home.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { RouterModule, Router } from '@angular/router';

@NgModule({
    declarations: [LoginComponent],
    providers: [
        AuthGuard,
        AuthService,
        HomeGuard, {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
    ]
})
export class AuthModule { }