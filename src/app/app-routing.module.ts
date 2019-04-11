import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';

import { ValidateLogin } from './app.validate.login';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'home', canActivate: [ValidateLogin], component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash:true})],
    exports: [RouterModule]
})

export class AppRoutingModule {}