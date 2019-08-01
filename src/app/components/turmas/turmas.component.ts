import { Component, OnInit } from '@angular/core';
import { TurmasService } from '../../services/turmas.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {

  constructor(private turmasService: TurmasService) { }

  ngOnInit() { }

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
        console.log(success);
      });
  }

}
