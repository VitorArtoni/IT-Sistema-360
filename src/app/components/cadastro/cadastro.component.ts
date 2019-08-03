import { Injectable, Component, OnInit, Input } from '@angular/core';
import { AlunosService } from '../../services/aluno.service';
import { TurmasService } from '../../services/turmas.service';
import { Router } from '@angular/router';
import { posAluno } from './model/aluno';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  providers: [AlunosService],
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Input()
  Turmas: any = [];

  constructor(private alunosService: AlunosService, private turmasService: TurmasService, private router: Router) { }

  ngOnInit() {
    this.turmasService.getTurmas().subscribe(res => {
      res.forEach(element => {
        this.Turmas.push(element.idTurma + "-" + element.Semestre + "-" + element.Ano);
      });
    });
  }

  cadastrarSenhaAluno(event) {
    event.preventDefault();
    const target = event.target;
    const ra = target.querySelector('#ra').value;
    const senha = target.querySelector('#senha').value;

    const novoAluno: posAluno = { ra,senha } as posAluno;

    this.alunosService.cadastrarSenhaAluno(novoAluno)
      .subscribe(success => {
        if (success) {
          alert('Senha cadastrada com sucesso');
          this.router.navigate(['/login']);
        }
      });
  }
}
