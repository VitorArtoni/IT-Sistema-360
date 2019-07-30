import { Injectable, Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-turmas',
    templateUrl: './turmas.component.html',
    styleUrls: ['./turmas.component.css']
})
export class TurmasComponent {
    constructor(private router: Router) { }
}