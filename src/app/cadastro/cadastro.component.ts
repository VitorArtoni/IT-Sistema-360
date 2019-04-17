import { Injectable, Component, OnInit, Input } from '@angular/core';
import { TurmasService } from './turmas.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Input()
  Turmas: any = [];

  constructor(private turmasService: TurmasService) { }

  ngOnInit() {
    this.turmasService.getTurmas().subscribe(res => {
      res.forEach(element => {
        this.Turmas.push(element.idTurma + "-" + element.Semestre + "-" + element.Ano);
      });
    });
  }
}
