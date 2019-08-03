import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../../services/aluno.service';
import { TurmasService } from '../../services/turmas.service';
import { preAluno } from '../cadastro/model/aluno';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  formAlunos: FormGroup;

  constructor(private alunosService: AlunosService, private turmasService: TurmasService) { }

  ngOnInit() { 
    this.formAlunos = new FormGroup({
      ra: new FormControl(),
      nome: new FormControl()
    });
  }

  cadastrarAluno(event) {
    event.preventDefault();
    const target = event.target;
    const ra = target.querySelector('#ra').value;
    const nome = target.querySelector('#nome').value;

    const novoAluno: preAluno = { ra,nome } as preAluno;

    this.alunosService.cadastrarAluno(novoAluno)
      .subscribe(success => {
        if (success) {
          alert('Aluno criado com sucesso');
          this.formAlunos.reset();
        }
      });
  }

  listarTurmas() {
    
  }
}
