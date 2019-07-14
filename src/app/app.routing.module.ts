import { AuthGuard } from './auth/guards/auth.guard';
import { HomeGuard } from './auth/guards/home.guard';
import { LoginComponent } from './auth/containers/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login'},
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [HomeGuard], canLoad: [HomeGuard]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }