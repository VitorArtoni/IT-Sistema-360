import { AuthGuard } from './components/auth/guards/auth.guard';
import { HomeGuard } from './components/auth/guards/home.guard';
import { CadastroGuard } from './components/auth/guards/cadastro.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { CadastroComponent } from './components/cadastro/containers/cadastro.component';
import { HomeComponent } from './components/home/containers/home/home.component';
import { CustomContent } from './components/content/content.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', canActivate: [AuthGuard], children: [
        {path: '', component: LoginComponent}
    ]},
    { path: 'home', canActivate: [HomeGuard], canLoad: [HomeGuard], children: [ 
        {path: '', component: HomeComponent},
        {path: 'turmas', component: CustomContent}
    ]},
    { path: 'cadastro', canActivate: [CadastroGuard], canLoad: [CadastroGuard], children: [
        {path: '', component: CadastroComponent}
    ]}
];

export const AppRoutingModule = RouterModule.forRoot(routes, {useHash: true});