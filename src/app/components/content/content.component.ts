import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'custom-content',
    templateUrl: './container/content.html',
    styleUrls: ['./container/content.css'],
})
export class CustomContent {
    @Input() label: string;
    
    constructor() { }
}