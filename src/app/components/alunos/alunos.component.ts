import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../../services/aluno.service';
import { TurmasService } from '../../services/turmas.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  constructor(private alunosService: AlunosService, private turmasService: TurmasService) { }

  ngOnInit() { }

  cadastrarAluno(event) {

  }

  listarTurmas() {
    
  }
}
