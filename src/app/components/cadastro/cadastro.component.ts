import { Injectable, Component, OnInit, Input } from '@angular/core';
import { CadastroService } from '../../services/cadastro.service';
import { TurmasService } from '../../services/turmas.service';
import { Router } from '@angular/router';
import { Aluno } from './model/aluno';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  providers: [CadastroService],
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Input()
  Turmas: any = [];

  constructor(private cadastroService: CadastroService, private turmasService: TurmasService, private router: Router) { }

  ngOnInit() {
    this.turmasService.getTurmas().subscribe(res => {
      res.forEach(element => {
        this.Turmas.push(element.idTurma + "-" + element.Semestre + "-" + element.Ano);
      });
    });
  }

  cadastrarAluno(event) {
    event.preventDefault();
    const target = event.target;
    const nome = target.querySelector('#nome').value;
    const ra = target.querySelector('#ra').value;
    const senha = target.querySelector('#senha').value;

    const novoAluno: Aluno = { nome,ra,senha} as Aluno;

    this.cadastroService.cadastrarAluno(novoAluno)
      .subscribe(aluno => {
        this.router.navigate(['/login']);
      });
  }
}
