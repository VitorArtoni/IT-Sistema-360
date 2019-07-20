import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './containers/cadastro.component';
import { CadastroRoutingModule } from './cadastro.routing.module';

@NgModule({
    declarations: [CadastroComponent],
    imports: [
        CommonModule,
        CadastroRoutingModule
    ]
})
export class CadastroModule { }