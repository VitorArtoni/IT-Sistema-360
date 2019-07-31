import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CadastroComponent } from './cadastro.component';

const routes: Routes = [
    {
        path: '/cadastro',
        component: CadastroComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class CadastroRoutingModule { }