import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';

import { LoginGuard } from './login.guard';

const appRoutes: Routes = [
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'cadastro', 
        component: CadastroComponent 
    },
    { 
        path: 'home', 
        component: HomeComponent,
        canActivate: [LoginGuard]
    }
];

export const routes = RouterModule.forRoot(appRoutes, { useHash: false });