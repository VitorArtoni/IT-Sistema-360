import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sistema360';
  actualRoute = '';

  constructor(private router:Router) { }

  checkRoutes() {
    this.router.events.subscribe((event) => {
      if (event['url'] && this.actualRoute != event['url']){
        this.actualRoute = event['url'];
      }
    })
  }

  ngOnInit() {
    this.checkRoutes();
  }
}
