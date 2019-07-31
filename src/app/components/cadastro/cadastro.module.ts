import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro.component';
import { CadastroRoutingModule } from './cadastro.routing.module';

@NgModule({
    declarations: [CadastroComponent],
    imports: [
        CommonModule,
        CadastroRoutingModule
    ]
})
export class CadastroModule { }