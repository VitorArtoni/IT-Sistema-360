import { AuthGuard } from './components/auth/guards/auth.guard';
import { HomeGuard } from './components/auth/guards/home.guard';
import { CadastroGuard } from './components/auth/guards/cadastro.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', canActivate: [AuthGuard], children: [
        { path: '', component: LoginComponent }
    ]},
    { path: '', canActivate: [HomeGuard], canLoad: [HomeGuard], children: [ 
        { path: 'home', component: HomeComponent },
        { path: 'turmas', component: HomeComponent },
        { path: 'alunos', component: HomeComponent },
        { path: 'grupos', component: HomeComponent },
        { path: 'presencas', component: HomeComponent },
        { path: 'atividades', component: HomeComponent },
        { path: 'participacao', component: HomeComponent },
        { path: 'notas', component: HomeComponent },
        { path: 'topicos', component: HomeComponent }
    ]},
    { path: 'cadastro', canActivate: [CadastroGuard], canLoad: [CadastroGuard], children: [
        { path: '', component: CadastroComponent }
    ]}
];

export const AppRoutingModule = RouterModule.forRoot(routes, {useHash: false});