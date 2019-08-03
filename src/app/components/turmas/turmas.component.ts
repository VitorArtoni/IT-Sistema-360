import { Component, OnInit } from '@angular/core';
import { TurmasService } from '../../services/turmas.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {
  formTurmas: FormGroup;

  constructor(private turmasService: TurmasService) { }

  ngOnInit() { 
    this.formTurmas = new FormGroup({
      idTurma: new FormControl(),
      disciplina: new FormControl(),
      semestre: new FormControl(),
      ano: new FormControl()
    })
  }

  cadastrarTurma(event) {
    event.preventDefault();
    const target = event.target;
    const idTurma = target.querySelector('#idTurma').value;
    const disciplina = target.querySelector('#disciplina').value;
    const semestre = target.querySelector('#semestre').value;
    const ano = target.querySelector('#ano').value;

    this.turmasService.cadastrarTurma(
      {
        idTurma,
        disciplina,
        semestre,
        ano
      }
    )
      .subscribe(success => {
        if (success) {
          alert('Turma criada com sucesso');
          this.formTurmas.reset();
        }        
      });
  }
}
