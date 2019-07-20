import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CadastroGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        return this.canLoad();
    }

    canLoad() {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/home']);
        }
        return !this.authService.isLoggedIn();
    }
}